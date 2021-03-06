<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

        <title>Grunt app boilerplate</title>

        <!-- Application styles. -->

        <!--(if target dev)><!-->
        <link rel="stylesheet" href="/vendor/normalize-css/normalize.css">
        <link rel="stylesheet" href="/styles/all.css">
        <!--<!(endif)-->

        <!--(if target debug)>
        <link rel="stylesheet" href="/styles/vendor.css">
        <link rel="stylesheet" href="/styles/main.css">
        <!(endif)-->

        <!--(if target release)>
        <link rel="stylesheet" href="/styles/main.min.css">
        <!(endif)-->

    </head>
    <body>
        <!-- Application container. -->

        <main role="main" id="main"></main>

        <!-- Application source. -->

        <!--(if target dev)><!-->   
        <script data-main="/scripts/main" src="/vendor/requirejs/require.js"></script>
        <script>__reloadServerUrl="ws://@@hostname:8001";</script>
        <script type="text/javascript" src="//@@hostname:8001/__reload/client.js"></script>
        <!--<!(endif)-->

        <!--(if target debug)>
        <script src="/scripts/main.js"></script>
        <!(endif)-->

        <!--(if target release)>
        <script src="/scripts/main.min.js"></script>
        <!(endif)-->        
    </body>
</html>
<!-- @@pkginfo, build: @@today -->