// Pure calculations for Plantation Calculator and Financial Projections

export interface PlantationCalculatorInputs {
  landArea: number;
  unit: 'acres' | 'hectares';
  calculationMode: 'density' | 'spacing';
  plantsPerAcre: number; // default 350 based on proposal
  spacingMeters?: { row: number; col: number }; // e.g. 3.5m x 3.5m
  saplingUnitPrice: number; // in INR
  mortalityBufferPercent: number; // e.g. 5%
  irrigationRequirement: 'drip_complete' | 'drip_lateral_only' | 'existing_irrigation' | 'rainfed';
  plantationServiceLevel: 'turnkey_full' | 'planting_and_setup' | 'technical_advisory' | 'saplings_only';
}

export interface PlantationCalculationResults {
  normalizedAcreage: number;
  baseSaplings: number;
  bufferSaplings: number;
  totalSaplingsToOrder: number;
  saplingTotalCost: number;
  landPreparationCost: number;
  irrigationSetupCost: number;
  plantationLabourCost: number;
  totalFirstYearCapitalCost: number;
  indicativeAnnualMaintenanceCost: number;
  // Illustrative non-guaranteed timber reference metrics
  survivingHarvestTreesEst: number;
  illustrativeTimberCubicFeetMin: number;
  illustrativeTimberCubicFeetMax: number;
  illustrativeGrossTimberValueMin: number;
  illustrativeGrossTimberValueMax: number;
}

export function convertToAcres(area: number, unit: 'acres' | 'hectares'): number {
  if (area <= 0) return 0;
  if (unit === 'hectares') {
    return Number((area * 2.47105).toFixed(2));
  }
  return Number(area.toFixed(2));
}

export function calculatePlantCountFromSpacing(acres: number, rowMeters: number, colMeters: number): number {
  if (acres <= 0 || rowMeters <= 0 || colMeters <= 0) return 0;
  // 1 acre = 4046.86 square meters
  const areaSqMeters = acres * 4046.86;
  const areaPerPlantSqMeters = rowMeters * colMeters;
  return Math.round(areaSqMeters / areaPerPlantSqMeters);
}

export function calculatePlantationEstimates(inputs: PlantationCalculatorInputs): PlantationCalculationResults {
  const normalizedAcreage = convertToAcres(inputs.landArea, inputs.unit);

  let baseSaplings = 0;
  if (inputs.calculationMode === 'spacing' && inputs.spacingMeters) {
    baseSaplings = calculatePlantCountFromSpacing(normalizedAcreage, inputs.spacingMeters.row, inputs.spacingMeters.col);
  } else {
    baseSaplings = Math.round(normalizedAcreage * (inputs.plantsPerAcre || 350));
  }

  const bufferPercent = Math.max(0, inputs.mortalityBufferPercent || 0);
  const bufferSaplings = Math.ceil(baseSaplings * (bufferPercent / 100));
  const totalSaplingsToOrder = baseSaplings + bufferSaplings;

  const saplingUnitPrice = Math.max(0, inputs.saplingUnitPrice || 0);
  const saplingTotalCost = totalSaplingsToOrder * saplingUnitPrice;

  // Indicative rates per acre based on Nature's Canopy benchmarks
  let irrigationPerAcre = 0;
  switch (inputs.irrigationRequirement) {
    case 'drip_complete':
      irrigationPerAcre = 38000;
      break;
    case 'drip_lateral_only':
      irrigationPerAcre = 22000;
      break;
    case 'existing_irrigation':
    case 'rainfed':
      irrigationPerAcre = 0;
      break;
  }
  const irrigationSetupCost = Math.round(normalizedAcreage * irrigationPerAcre);

  let landPrepPerAcre = 0;
  let labourPerSapling = 0;
  let annualMaintPerAcre = 0;

  switch (inputs.plantationServiceLevel) {
    case 'turnkey_full':
      landPrepPerAcre = 18500;
      labourPerSapling = 28;
      annualMaintPerAcre = 16000;
      break;
    case 'planting_and_setup':
      landPrepPerAcre = 14000;
      labourPerSapling = 22;
      annualMaintPerAcre = 8000;
      break;
    case 'technical_advisory':
      landPrepPerAcre = 3500;
      labourPerSapling = 0;
      annualMaintPerAcre = 2500;
      break;
    case 'saplings_only':
      landPrepPerAcre = 0;
      labourPerSapling = 0;
      annualMaintPerAcre = 0;
      break;
  }

  const landPreparationCost = Math.round(normalizedAcreage * landPrepPerAcre);
  const plantationLabourCost = Math.round(baseSaplings * labourPerSapling);
  const totalFirstYearCapitalCost = saplingTotalCost + irrigationSetupCost + landPreparationCost + plantationLabourCost;
  const indicativeAnnualMaintenanceCost = Math.round(normalizedAcreage * annualMaintPerAcre);

  // Illustrative commercial reference metrics (15-year rotation cycle, standard 85-90% survival)
  const survivingHarvestTreesEst = Math.round(baseSaplings * 0.88);
  // Average commercial timber volume: 15 to 25 cubic feet per tree at 15 years
  const illustrativeTimberCubicFeetMin = survivingHarvestTreesEst * 15;
  const illustrativeTimberCubicFeetMax = survivingHarvestTreesEst * 25;
  // Indicative historical farmgate timber rate benchmark ₹2,500 - ₹3,500 per cu.ft
  const illustrativeGrossTimberValueMin = illustrativeTimberCubicFeetMin * 2500;
  const illustrativeGrossTimberValueMax = illustrativeTimberCubicFeetMax * 3500;

  return {
    normalizedAcreage,
    baseSaplings,
    bufferSaplings,
    totalSaplingsToOrder,
    saplingTotalCost,
    landPreparationCost,
    irrigationSetupCost,
    plantationLabourCost,
    totalFirstYearCapitalCost,
    indicativeAnnualMaintenanceCost,
    survivingHarvestTreesEst,
    illustrativeTimberCubicFeetMin,
    illustrativeTimberCubicFeetMax,
    illustrativeGrossTimberValueMin,
    illustrativeGrossTimberValueMax,
  };
}

export function formatINR(val: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
}
