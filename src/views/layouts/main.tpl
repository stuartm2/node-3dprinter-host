<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <link rel="stylesheet" href="/static/bootstrap.min.css">
        <link rel="stylesheet" href="/static/style.css">

        <title>3D Printer Host</title>
    </head>
    <body>
        <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">3DHost</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Files <span class="sr-only">(current)</span></a>
                    </li>
                </ul>
            </div>
        </nav>

        <br>

        <div class="container-fluid">
            {{{ body }}}
        </div>

        <script src="/static/jquery-3.3.1.min.js"></script>
        <script src="/static/popper.min.js"></script>
        <script src="/static/bootstrap.min.js"></script>
        <script src="/static/shared.js"></script>
        <script src="/static/code.js"></script>
    </body>
</html>
