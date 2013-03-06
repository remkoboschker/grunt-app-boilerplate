require.config
    baseUrl: "../"  # application dir, paths are relative to it

    paths: {
        $ : 'vendor/jquery/jquery',
        handlebars  : 'vendor/handlebars/handlebars',
        #text : 'vendor/require/plugins/text',

        App: 'scripts/app',
        AppLayout: 'templates/layout',

        HelloModule: 'modules/hello/scripts/hello',
        HelloTemplate: 'modules/hello/templates/hello'
    }

    shim: {
        '$': {
            exports: '$'
        }, 
        'handlebars': {
            exports: 'Handlebars'
        }
    }

require ['$', 'App'], ($, App) ->
    $ ->
        new App()