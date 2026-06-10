// ══════════════════════════════════════════════════════════
// RECIPE ROLE VALIDATOR CLI — Gear Tab Phase 3 (§3.7 / §5.1)
// ══════════════════════════════════════════════════════════
//
// Agent emit-time entry point for the §3.7 reverse guard. Runs the SHIPPED
// validateRecipeRoles() — extracted verbatim from the current beta HTML via
// banner-string navigation — against the real gear-inventory.js. No logic is
// duplicated here; if the HTML validator changes, this CLI follows it.
//
// Usage (from repo root):
//   node validate-recipe-roles.js <recipe.json>   validate a recipe file;
//                                                 exit 0 = valid, 1 = invalid
//   node validate-recipe-roles.js --index         dump ROLE_INDEX (forward guard)
//   node validate-recipe-roles.js --roles <gearId>  list a gear item's roles[]
//
// The Tone Engineer agent MUST run the recipe form before emitting any
// recipe (GEAR_TAB_DESIGN.md §5.1 step 4): if invalid, regenerate — never emit.

const fs = require('fs');
const path = require('path');

const root = __dirname;
const beta = fs.readdirSync(root).filter(f => /^TONE__BETA_v.*\.html$/.test(f)).sort().pop();
if (!beta) { console.error('No TONE__BETA_v*.html found in ' + root); process.exit(2); }

const html = fs.readFileSync(path.join(root, beta), 'utf8');
const gearSrc = fs.readFileSync(path.join(root, 'gear-inventory.js'), 'utf8');

const start = html.indexOf('// GEAR ROLE INDEX');
const end = html.indexOf('// SELF-TEST HARNESS');
if (start < 0 || end < 0 || end <= start) {
  console.error('Banner extraction failed — GEAR ROLE INDEX / SELF-TEST HARNESS banners not found in ' + beta);
  process.exit(2);
}

globalThis.window = globalThis; // satisfy the block's window.* exports
eval(gearSrc + '\n' + html.slice(start, end));

const arg = process.argv[2];
if (!arg || arg === '--help') {
  console.log('usage: node validate-recipe-roles.js <recipe.json> | --index | --roles <gearId>');
  process.exit(arg ? 0 : 2);
}

if (arg === '--index') {
  console.log(JSON.stringify(window.ROLE_INDEX, null, 1));
  process.exit(0);
}

if (arg === '--roles') {
  const found = window.findGearById(GEAR_INVENTORY, process.argv[3] || '');
  if (!found) { console.error('unknown gearId: ' + process.argv[3]); process.exit(1); }
  const out = { gearId: found.item.id, category: found.category, roles: found.item.roles || [] };
  if (Array.isArray(found.item.sides)) {
    out.sides = found.item.sides.map(s => ({ sideId: s.sideId, roles: s.roles || [] }));
  }
  console.log(JSON.stringify(out, null, 1));
  process.exit(0);
}

const recipe = JSON.parse(fs.readFileSync(arg, 'utf8'));
const result = window.validateRecipeRoles(recipe);
if (result.valid) {
  console.log('VALID — every role assertion is backed by gear roles[] (§3.7)');
  process.exit(0);
} else {
  console.error('INVALID — ' + result.errors.length + ' role-assertion error(s):');
  result.errors.forEach(e => console.error('  ' + JSON.stringify(e)));
  console.error('Per §5.1 step 4: regenerate the recipe — do not emit.');
  process.exit(1);
}
