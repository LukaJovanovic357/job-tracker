import { test, expect } from '@playwright/test';

test('landing page title', async ({ page }) => {
    await page.goto('http://localhost:3000/landing');
    await expect(page).toHaveTitle(/Job-Finder/);
});

test('login/register button navigation', async ({ page }) => {
    await page.goto('http://localhost:3000/landing');
    await page.getByRole('link', { name: 'Login/Register' }).click();
    await page.goto('http://localhost:3000/register');
});

test('login user', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.getByLabel('email').fill('cedo@exampleUser.com');
    await page.getByLabel('password').fill('cedo123');
    await page.getByRole('button', { name: 'submit' }).click();
    await expect(
        page.getByRole('heading', { name: 'dashboard' })
    ).toBeVisible();
});

test('show monthly applications', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.getByLabel('email').fill('cedo@exampleUser.com');
    await page.getByLabel('password').fill('cedo123');
    await page.getByLabel('password').press('Enter');
    await expect(
        page.getByRole('heading', { name: 'Monthly Applications' })
    ).toBeVisible();
});

test('show all jobs', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.getByLabel('email').fill('cedo@exampleUser.com');
    await page.getByLabel('password').fill('cedo123');
    await page.getByLabel('password').press('Enter');
    await page.getByRole('link', { name: 'all jobs' }).click();
    await expect(
        page.getByText(
            'search formsearchstatusallinterviewdeclinedpendingtypeallfull-timepart-'
        )
    ).toBeVisible();
});

test('show add job', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.getByLabel('email').fill('cedo@exampleUser.com');
    await page.getByLabel('password').fill('cedo123');
    await page.getByLabel('password').press('Enter');
    await page.getByRole('link', { name: 'add job' }).click();
    await expect(page.getByRole('main').locator('section')).toBeVisible();
});

test('show profile', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.getByLabel('email').fill('cedo@exampleUser.com');
    await page.getByLabel('password').fill('cedo123');
    await page.getByLabel('password').press('Enter');
    await page.getByRole('link', { name: 'profile' }).click();
    await expect(
        page.locator('section').filter({
            hasText: /^profilenamelast nameemaillocationsave changes$/
        })
    ).toBeVisible();
});

test('logout function', async ({ page }) => {
    await page.goto('http://localhost:3000/landing');
    await page.getByRole('link', { name: 'Login/Register' }).click();
    await page.getByLabel('email').fill('cedo@exampleUser.com');
    await page.getByLabel('password').fill('cedo123');
    await page.getByRole('button', { name: 'submit' }).click();
    await page.getByRole('button', { name: 'Cedo' }).click();
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(
        page.getByRole('heading', { name: 'Job Tracker App' })
    ).toBeVisible();
});

test('register user', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.getByRole('button', { name: 'Register' }).click();
    await page.getByLabel('name').fill('Kevin Frank');
    await page.getByLabel('email').fill('kevinKigeni@mailinator.com');
    await page.getByLabel('password').fill('Pa$$wOrd!');
    await page.getByRole('button', { name: 'submit' }).click();
});
