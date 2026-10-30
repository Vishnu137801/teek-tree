import test from 'node:test';
import assert from 'node:assert/strict';
import {
  convertToAcres,
  calculatePlantCountFromSpacing,
  calculatePlantationEstimates,
  formatINR,
} from './calculator';

test('convertToAcres converts correctly', () => {
  assert.equal(convertToAcres(10, 'acres'), 10);
  assert.equal(convertToAcres(1, 'hectares'), 2.47);
  assert.equal(convertToAcres(0, 'acres'), 0);
});

test('calculatePlantCountFromSpacing calculates correct saplings', () => {
  // 1 acre = 4046.86 m2. Spacing 3.5m x 3.5m = 12.25 m2 -> ~330 trees
  const count = calculatePlantCountFromSpacing(1, 3.5, 3.5);
  assert.ok(count >= 320 && count <= 340);
});

test('calculatePlantationEstimates handles default 350-acre proposal figures', () => {
  // Proposal reference: 350 acres at 350 plants/acre = 122,500 saplings
  const res = calculatePlantationEstimates({
    landArea: 350,
    unit: 'acres',
    calculationMode: 'density',
    plantsPerAcre: 350,
    saplingUnitPrice: 120,
    mortalityBufferPercent: 5,
    irrigationRequirement: 'drip_complete',
    plantationServiceLevel: 'turnkey_full',
  });

  assert.equal(res.normalizedAcreage, 350);
  assert.equal(res.baseSaplings, 122500);
  // 5% buffer on 122,500 = 6,125
  assert.equal(res.bufferSaplings, 6125);
  assert.equal(res.totalSaplingsToOrder, 128625);
  assert.equal(res.saplingTotalCost, 128625 * 120);
  assert.ok(res.totalFirstYearCapitalCost > 0);
  assert.ok(res.survivingHarvestTreesEst > 100000);
});

test('formatINR formats currency in Indian numbering', () => {
  const formatted = formatINR(100000);
  assert.ok(formatted.includes('1,00,000') || formatted.includes('100,000'));
});
