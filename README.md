# Food How

[![Build Status](https://travis-ci.org/troyblank/foodhow.svg?branch=master)](https://travis-ci.org/troyblank/foodhow)
[![Coverage Status](https://coveralls.io/repos/github/troyblank/foodhow/badge.svg?branch=master)](https://coveralls.io/github/troyblank/foodhow?branch=master)

Food how is a recipe book and shopping list that deploys as static files. For more information see [troyblank.com](http://troyblank.com/#portfolio:/specimens/2014/foodHow/ "Food How").

## Requirements

* node: 10.16.2

## Setup
First thing you want to do is install all node packages run:

    npm install

In order to build and run the project run:

    npm start
    
## Test

    npm test

## Adding recipes

To add a recipe simply make a new json file in ```static/recipes``` that follows this format:

    {
        "title": "Some Food",
        "meta": "This is a really good food.",
        "ingredients": [
            "[1 link to another recipe](/some/link)",
            "1 meat",
            "1 cup fruit (processed)",
            "&frac12; tsp spice"
        ],
        "directions": [
            { "text": "Mash ingredient together." },
            { "text": "Maybe throw in hot sauce (optional).", type: "optional" },
            { "text": "Eat." }
        ]
    }

Then add the new recipe to the list in ```static/recipes.js```

When adding recipes it's important to note that underscores will be used in lieu of spaces in file names. For example "Some_Food.json" will show up as "Some Food" to the user.

### Additional recipe formats

Ingredient groups:

    {
        ...
       "ingredients": {
            "Brine": [
                "1 15lb turkey",
                "1 gallon vegetable stock"
            ],
            "Stuffing": [
                "4 sprigs rosemary",
                "6 leaves sage"
            ]
        },
        ...
    }

## Types

### Recipe type
| property | description | type
|---|---|---|
| title | Title of recipe | string
| meta | Subtext for recipe | string
| ingredients | List of ingredients | [string] \| object
| directions | List of directions | [direction]

### Direction type

| property | description | type  | values
|---|---|---|---|
| text | The step instructions | string |
| type | Puts emphasis on how the step is displayed | string | `"normal"` (default), or "`optional"` |
