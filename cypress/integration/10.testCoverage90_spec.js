import { getId } from '../utils/getId';

describe('10 - Develop tests to achieve 90% total coverage of the application', () => {
  it('Total "Statements" coverage should be greater than or equal to 90.', () => {
    cy.task('getCoverage', getId()).its('total.statements.pct', { timeout: 0 }).should('be.gte', 90.00);
  });

  it('Total "Functions" coverage should be greater than or equal to 90.', () => {
    cy.task('getCoverage', getId()).its('total.functions.pct', { timeout: 0 }).should('be.gte', 90.00);
  });

  it('Total "Branches" coverage should be greater than or equal to 90.', () => {
    cy.task('getCoverage', getId()).its('total.branches.pct', { timeout: 0 }).should('be.gte', 90.00);
  });

  it('Total "Lines" coverage should be greater than or equal to 90.', () => {
    cy.task('getCoverage', getId()).its('total.lines.pct', { timeout: 0 }).should('be.gte', 90.00);
  });
});
