<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{config('app.name')}}</title>
    <link rel="stylesheet" href="./bower_components/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="./bower_components/bootstrap/dist/css/bootstrap-theme.min.css">
    <style>
        .table td, table th{
            text-align: center;
        }
    </style>
</head>
<body>
<div class="container">
    @yield('content')
</div>
</body>
</html>