require.config

    packages: [
        {
            "name": "jquery",
            "location": "../vendor/jquery",
            "main": "jquery.js"
        },
        {
            "name": "handlebars",
            "location": "../vendor/handlebars",
            "main": "handlebars.js"
        }
    ]

    shim: {
        "handlebars": {
            "exports": "Handlebars"
        }
    }