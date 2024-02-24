import { getId } from '../utils/getId';

describe('8 - Develop tests to achieve 60% total coverage of the application', () => {
  it('Total "Statements" coverage should be greater than or equal to 60.', () => {
    cy.task('getCoverage', getId()).its('total.statements.pct', { timeout: 0 }).should('be.gte', 60.00);
  });

  it('Total "Functions" coverage should be greater than or equal to 60.', () => {
    cy.task('getCoverage', getId()).its('total.functions.pct', { timeout: 0 }).should('be.gte', 60.00);
  });

  it('Total "Branches" coverage should be greater than or equal to 60.', () => {
    cy.task('getCoverage', getId()).its('total.branches.pct', { timeout: 0 }).should('be.gte', 60.00);
  });

  it('Total "Lines" coverage should be greater than or equal to 60.', () => {
    cy.task('getCoverage', getId()).its('total.lines.pct', { timeout: 0 }).should('be.gte', 60.00);
  });
});
