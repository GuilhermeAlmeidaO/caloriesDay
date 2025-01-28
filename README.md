# Calories Day

This app allow you record the nutrients of your meals. "You can log the calories, fat, carbs, and protein of each food you eat. With your personal data, such as your height, weight, and age, the app will perform the calculations.

![image](https://github.com/user-attachments/assets/98368cd9-f05b-4fcd-801c-ad288fd25daf)

## Demonstration

When you access the app for the first time, you must input your height, weight, and age. With this information, the app will calculate how much of each nutrient you can consume per day.

![image](https://github.com/user-attachments/assets/ad20f529-48a7-40dd-9def-3949f609becd)

After entering your data, you will see a table and progress bars (if you are not using a small screen), as well as a toolbar at the bottom with three buttons: settings, add food, and share your history and data.
## Learnings

Since the app doesn't have a database that allows users to create an account, I had to save the data in localStorage. This created another problem: ***how can the user view their history on another device?***

I came up with the idea of creating a link containing the localStorage data from the current device. However, the link was too long. To fix this, the app makes a POST request to TinyURL, which shortens the URL and generates a QR code.
## Installation

To install the app is simple, just you need:
```bash
npm clone https://github.com/GuilhermeAlmeidaO/caloriesDay.git
npm i
npm run dev
```
## Stacks used

![](https://skillicons.dev/icons?i=next,tailwind,npm,vercel,ts)
