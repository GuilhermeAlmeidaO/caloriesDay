# Calories Day

In this app you can record the nutrients of your meals. You can write the calories, fat, carbs and protein each food that you eat, and with your personal data like your height, weight and age, and the app will do the calculation.

[image app]

## Demonstration

When you access the app for the first time, you must write your height, weight and age, with this, the app can make the calculate how many of each nutrient you can consume per day.

[form image]

After you write your data, you'll can see a table and some progress bar if you aren't using it on a small screen and a toolbar at the bottom, with three buttons: the settings, add food and share your history and data.

## Learnings

How the app doesn't has a database that unable user create a account, i had to save the datas on localStorage, and this creates another problem: **_how the user can see your history in other device?_**

And i had a idea to create a link with the localstorage of the current device, but the link is too big, and to fix this, the app make a post to TinyURL that reduce the url and create a qrCode.

## Installation

To install the app is simple, just you need:

```bash
npm clone https://github.com/GuilhermeAlmeidaO/caloriesDay.git
npm i
npm run dev
```

## Stacks used

![](https://skillicons.dev/icons?i=next,tailwind,npm,vercel,ts)
