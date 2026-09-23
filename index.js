
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Pune Municipal Corporation</title>
        <meta name="description" content="">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" type="img/png" sizes="16x16" href="img/favicon-16x16.png">

        <!-- build:css styles/vendor.css -->
        <!-- injector:bowercss -->
        <link rel="stylesheet" href="lib/bootstrap/dist/css/bootstrap.css">
        <link rel="stylesheet" href="lib/angular-snap/angular-snap.css">
        <link rel="stylesheet" href="lib/oi.select/dist/select.min.css">
        <link rel="stylesheet" href="lib/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.css">
        <!-- endinjector -->
        <!-- endbuild -->

        <!-- build:css styles/custom.css -->
        <!-- injector:css -->
        <link rel="stylesheet" href="css/customcordova.css">
        <link rel="stylesheet" href="css/datepicker.css">
        <link rel="stylesheet" href="css/demo.css">
        <link rel="stylesheet" href="css/font-awesome.min.css">
        <link rel="stylesheet" href="css/map.css">
        <!-- endinjector -->
        <!-- endbuild -->
        <script src="cordova.js"></script>
        <style>
            .pre_status{width:200px;height:200px;position:absolute;left:50%;top:50%;background-image:url(img/preloader.gif);background-repeat:no-repeat;background-position:center;margin:-100px 0 0 -100px}
            @font-face{font-family:'Glyphicons Halflings';src:url(fonts/glyphicons-halflings-regular.eot);src:url(fonts/glyphicons-halflings-regular.eot?#iefix) format("embedded-opentype"),url(fonts/glyphicons-halflings-regular.woff) format("woff"),url(fonts/glyphicons-halflings-regular.ttf) format("truetype"),url(fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular) format("svg")}

        </style>
    </head>
    <body>
            <ul class="drawer-nav" ng-if="role === 'Surveyor'" ng-cloak>
            <li role="presentation" class="hidden-md  visible-xs-block welcomeText" snap-close> <a href="?#!/myprofile">Welcome {{userName}}</a></li>
            <li role="presentation"><a href="?#!/home" snap-close class="snap-close"><i class="glyphicon glyphicon-dashboard"></i> Home</a></li>
            <li role="presentation"><a href="?#!/newtaggedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Property Locations</a></li>
            <!-- <li role="presentation"><a href="?#!/aformDataEntry" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> A-form Data Entry</a></li> -->
            <li role="presentation"><a href="?#!/newproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> New Property</a></li>
            <li role="presentation"><a href="?#!/oldproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Old Property</a></li>
            <li role="presentation"><a href="?#!/reassignedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Reassigned Property</a></li>
            <li role="presentation"><a href="?#!/submittedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Submitted Property</a></li>
            <li role="presentation"><a href="?#!/savedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Saved Property</a></li>
            <li role="presentation"><a href="?#!/lockproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Locked Property</a></li>
            <li role="presentation"><a href="?#!/notices" snap-close class="snap-close"><i class="glyphicon glyphicon-file"></i> Notices</a></li>
            <li role="presentation"><a href="?#!/tracker" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> GEPS Tracker</a></li>
            <li role="presentation"><a href="?#!/pending" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> Pending Summary</a></li>
           
            <li role="presentation"><a href="?#!/reports" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> Reports</a></li>
            <li role="presentation"><a href="?#!/searchPolygonId" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> Search Polygon ID</a></li>
            <li role="presentation"><a href="?#!/myprofile" snap-close class="snap-close"><i class="glyphicon glyphicon-user"></i> My Profile</a></li>
            <li role="presentation"><a href="?#!/changepassword" snap-close class="snap-close"><i class="glyphicon glyphicon-cog"></i> Change Password</a></li>
            <li role="presentation"><a ng-click="logout()" snap-close class="snap-close"><i class="glyphicon glyphicon-off"></i> Logout</a></li>
            <li role="presentation"><a  snap-close class="snap-close"><i class="glyphicon glyphicon-info-sign"></i> Version {{apk_version}}</li>
        </ul>
        <ul class="drawer-nav" ng-if="role === 'Moderator'" ng-cloak>
            <li role="presentation" class="hidden-md  visible-xs-block welcomeText" snap-close> <a href="?#!/myprofile">Welcome {{userName}}</a></li>
            <li role="presentation"><a href="?#!/home" snap-close class="snap-close"><i class="glyphicon glyphicon-dashboard"></i> Home</a></li>
            <li role="presentation"><a href="?#!/newtaggedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Property Locations</a></li>
            <li role="presentation"><a href="?#!/assignedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Assigned Property</a></li>
            <li role="presentation"><a href="?#!/submittedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Submitted Property</a></li>
            <li role="presentation"><a href="?#!/reassignedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Reassigned Property</a></li>
            <li role="presentation"><a href="?#!/savedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Saved Property</a></li>
            <li role="presentation"><a href="?#!/lockproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Locked Property</a></li>
            <li role="presentation"><a href="?#!/notices" snap-close class="snap-close"><i class="glyphicon glyphicon-file"></i> Notices</a></li>
            <li role="presentation"><a href="?#!/delegatednotices" snap-close class="snap-close"><i class="glyphicon glyphicon-file"></i> Delegated Notices</a></li>
             
            <li role="presentation"><a href="?#!/allocatearea" snap-close class="snap-close"><i class="glyphicon glyphicon-screenshot"></i> Allocate Area</a></li>
            <li role="presentation"><a href="?#!/completedarea" snap-close class="snap-close"><i class="glyphicon glyphicon-screenshot"></i> Completed Area</a></li>
            <li role="presentation"><a href="?#!/recentsurvey" snap-close class="snap-close"><i class="glyphicon glyphicon-screenshot"></i> Recent Survey</a></li>
            <li role="presentation"><a href="?#!/tracker" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> GEPS Tracker</a></li>
            <li role="presentation"><a href="?#!/pending" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> Pending Summary</a></li>
            <li role="presentation"><a href="?#!/reports" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> Reports</a></li>
            <li role="presentation"><a href="?#!/myprofile" snap-close class="snap-close"><i class="glyphicon glyphicon-user"></i> My Profile</a></li>
            <li role="presentation"><a href="?#!/changepassword" snap-close class="snap-close"><i class="glyphicon glyphicon-cog"></i> Change Password</a></li>
            <li role="presentation"><a ng-click="logout()" snap-close class="snap-close"><i class="glyphicon glyphicon-off"></i> Logout</a></li>
            <li role="presentation"><a  snap-close class="snap-close"><i class="glyphicon glyphicon-info-sign"></i> Version {{apk_version}}</li>
        </ul>
        <ul class="drawer-nav" ng-if="role === 'Super Moderator'" ng-cloak>
            <li role="presentation" class="hidden-md  visible-xs-block welcomeText" snap-close> <a href="?#!/myprofile">Welcome {{userName}}</a></li>
            <li role="presentation"><a href="?#!/home" snap-close class="snap-close"><i class="glyphicon glyphicon-dashboard"></i> Home</a></li>
            <li role="presentation"><a href="?#!/newtaggedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Property Locations</a></li>
            <li role="presentation"><a href="?#!/users" snap-close class="snap-close">Users</a></li>
            <!--<li role="presentation"><a href="?#!/allocatearea" snap-close class="snap-close"><i class="glyphicon glyphicon-screenshot"></i> Allocate Area</a></li>-->
            <li role="presentation"><a href="?#!/completedarea" snap-close class="snap-close">Completed Area</a></li>
            <li role="presentation"><a href="?#!/reports" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> Reports</a></li>
            <li role="presentation"><a href="?#!/myprofile" snap-close class="snap-close"><i class="glyphicon glyphicon-user"></i> My Profile</a></li>
            <li role="presentation"><a href="?#!/changepassword" snap-close class="snap-close"><i class="glyphicon glyphicon-cog"></i> Change Password</a></li>
            <li role="presentation"><a ng-click="logout()" snap-close class="snap-close"><i class="glyphicon glyphicon-off"></i> Logout</a></li>
            <li role="presentation"><a  snap-close class="snap-close"><i class="glyphicon glyphicon-info-sign"></i> Version {{apk_version}}</li>
        </ul>
        <ul class="drawer-nav" ng-if="role === 'SI'" ng-cloak>
            <li role="presentation" class="hidden-md  visible-xs-block welcomeText" snap-close> <a href="?#!/myprofile">Welcome {{userName}}</a></li>
            <li role="presentation"><a href="?#!/home" snap-close class="snap-close"><i class="glyphicon glyphicon-dashboard"></i> Home</a></li>
            <li role="presentation"><a href="?#!/newtaggedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Property Locations</a></li>
            <li role="presentation"><a href="?#!/AformDataEntry" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> A-form Data Entry</a></li>
            <li role="presentation"><a href="?#!/newproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> New Property</a></li>
            <li role="presentation"><a href="?#!/oldproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Old Property</a></li>
            
            <li role="presentation"><a href="?#!/assignedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Assigned Property</a></li>
            <li role="presentation"><a href="?#!/submittedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Submitted Property</a></li>
            <li role="presentation"><a href="?#!/reassignedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Reassigned Property</a></li>
            <li role="presentation"><a href="?#!/savedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Saved Property</a></li>
            <li role="presentation"><a href="?#!/lockproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Locked Property</a></li>
             <!--<li role="presentation"><a href="?#!/certifiedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> 'CC' Property</a></li>-->
            <li role="presentation"><a href="?#!/notices" snap-close class="snap-close"><i class="glyphicon glyphicon-file"></i> Notices</a></li>
            <li role="presentation"><a href="?#!/completedarea" snap-close class="snap-close"><i class="glyphicon glyphicon-screenshot"></i> Completed Area</a></li>
            <li role="presentation"><a href="?#!/tracker" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> GEPS Tracker</a></li>
            <li role="presentation"><a href="?#!/pending" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> Pending Summary</a></li>
            <li role="presentation"><a href="?#!/reports" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> Reports</a></li>
            <li role="presentation"><a href="?#!/searchPolygonId" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> Search Polygon ID</a></li>
            <li role="presentation"><a href="?#!/myprofile" snap-close class="snap-close"><i class="glyphicon glyphicon-user"></i> My Profile</a></li>
            <li role="presentation"><a href="?#!/changepassword" snap-close class="snap-close"><i class="glyphicon glyphicon-cog"></i> Change Password</a></li>
            <li role="presentation"><a ng-click="logout()" snap-close class="snap-close"><i class="glyphicon glyphicon-off"></i> Logout</a></li>
            <li role="presentation"><a  snap-close class="snap-close"><i class="glyphicon glyphicon-info-sign"></i> Version {{apk_version}}</li>
            
        </ul>
        <ul class="drawer-nav" ng-if="role === 'DI'" ng-cloak>
            <li role="presentation" class="hidden-md  visible-xs-block welcomeText" snap-close> <a href="?#!/myprofile">Welcome {{userName}}</a></li>
            <li role="presentation"><a href="?#!/home" snap-close class="snap-close"><i class="glyphicon glyphicon-dashboard"></i> Home</a></li>
            <li role="presentation"><a href="?#!/newtaggedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Property Locations</a></li>
            <li role="presentation"><a href="?#!/assignedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Assigned Property</a></li>
            <li role="presentation"><a href="?#!/submittedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Submitted Property</a></li>
            <li role="presentation"><a href="?#!/savedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Saved Property</a></li>
            <li role="presentation"><a href="?#!/completedarea" snap-close class="snap-close"><i class="glyphicon glyphicon-screenshot"></i> Completed Area</a></li>
             <li role="presentation"><a href="?#!/tracker" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> GEPS Tracker</a></li>
             <li role="presentation"><a href="?#!/pending" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> Pending Summary</a></li>
            <li role="presentation"><a href="?#!/reports" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> Reports</a></li>
            <li role="presentation"><a href="?#!/myprofile" snap-close class="snap-close"><i class="glyphicon glyphicon-user"></i> My Profile</a></li>
            <li role="presentation"><a href="?#!/changepassword" snap-close class="snap-close"><i class="glyphicon glyphicon-cog"></i> Change Password</a></li>
            <li role="presentation"><a ng-click="logout()" snap-close class="snap-close"><i class="glyphicon glyphicon-off"></i> Logout</a></li>
            <li role="presentation"><a  snap-close class="snap-close"><i class="glyphicon glyphicon-info-sign"></i> Version {{apk_version}}</li>
           
        </ul>
        <ul class="drawer-nav" ng-if="role === 'AO'" ng-cloak>
            <li role="presentation" class="hidden-md  visible-xs-block welcomeText" snap-close> <a href="?#!/myprofile">Welcome {{userName}}</a></li>
            <li role="presentation"><a href="?#!/home" snap-close class="snap-close"><i class="glyphicon glyphicon-dashboard"></i> Home</a></li>
            <li role="presentation"><a href="?#!/newtaggedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Property Locations</a></li>
            <li role="presentation"><a href="?#!/assignedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Assigned Property</a></li>
            <li role="presentation"><a href="?#!/submittedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Submitted Property</a></li>
            <li role="presentation"><a href="?#!/savedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Saved Property</a></li>
            <li role="presentation"><a href="?#!/completedarea" snap-close class="snap-close"><i class="glyphicon glyphicon-screenshot"></i> Completed Area</a></li>
            <li role="presentation"><a href="?#!/tracker" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> GEPS Tracker</a></li>
            <li role="presentation"><a href="?#!/pending" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> Pending Summary</a></li>
            <li role="presentation"><a href="?#!/reports" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> Reports</a></li>
            <li role="presentation"><a href="?#!/myprofile" snap-close class="snap-close"><i class="glyphicon glyphicon-user"></i> My Profile</a></li>
            <li role="presentation"><a href="?#!/changepassword" snap-close class="snap-close"><i class="glyphicon glyphicon-cog"></i> Change Password</a></li>
            <li role="presentation"><a ng-click="logout()" snap-close class="snap-close"><i class="glyphicon glyphicon-off"></i> Logout</a></li>
            <li role="presentation"><a  snap-close class="snap-close"><i class="glyphicon glyphicon-info-sign"></i> Version {{apk_version}}</li>
            
        </ul>
        <ul class="drawer-nav" ng-if="role === 'HOD'" ng-cloak>
            <li role="presentation" class="hidden-md  visible-xs-block welcomeText" snap-close> <a href="?#!/myprofile">Welcome {{userName}}</a></li>
            <li role="presentation"><a href="?#!/home" snap-close class="snap-close"><i class="glyphicon glyphicon-dashboard"></i> Home</a></li>
            <li role="presentation"><a href="?#!/newtaggedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Property Locations</a></li>
            <li role="presentation"><a href="?#!/assignedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Assigned Property</a></li>
            <!--            <li role="presentation"><a href="?#!/assignedproperty" snap-close class="snap-close">Assigned Property By Akarni</a></li>-->
            <li role="presentation"><a href="?#!/submittedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Submitted Property</a></li>
            <li role="presentation"><a href="?#!/savedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Saved Property</a></li>
            <li role="presentation"><a href="?#!/acceptednotices" snap-close class="snap-close"><i class="glyphicon glyphicon-file"></i> Accepted Notices</a></li>
            <li role="presentation"><a href="?#!/completedarea" snap-close class="snap-close"><i class="glyphicon glyphicon-screenshot"></i> Completed Area</a></li>
            <li role="presentation"><a href="?#!/tracker" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> GEPS Tracker</a></li>
            <li role="presentation"><a href="?#!/pending" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> Pending Summary</a></li>
            <li role="presentation"><a href="?#!/reports" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> Reports</a></li>
            <li role="presentation"><a href="?#!/myprofile" snap-close class="snap-close"><i class="glyphicon glyphicon-user"></i> My Profile</a></li>
            <li role="presentation"><a href="?#!/changepassword" snap-close class="snap-close"><i class="glyphicon glyphicon-cog"></i> Change Password</a></li>
            <li role="presentation"><a ng-click="logout()" snap-close class="snap-close"><i class="glyphicon glyphicon-off"></i> Logout</a></li>
            <li role="presentation"><a  snap-close class="snap-close"><i class="glyphicon glyphicon-info-sign"></i> Version {{apk_version}}</li>
            
        </ul>
        <ul class="drawer-nav" ng-if="role === 'Akarni'" ng-cloak>
            <li role="presentation" class="hidden-md  visible-xs-block welcomeText" snap-close> <a href="?#!/myprofile">Welcome {{userName}}</a></li>
            <li role="presentation"><a href="?#!/home" snap-close class="snap-close"><i class="glyphicon glyphicon-dashboard"></i> Home</a></li>
            <li role="presentation"><a href="?#!/newtaggedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Property Locations</a></li>
            <li role="presentation"><a href="?#!/assignedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Assigned Property</a></li>
            <!--            <li role="presentation"><a href="?#!/submittedproperty" snap-close class="snap-close">Submitted Property</a></li>-->
            <li role="presentation"><a href="?#!/savedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Saved Property</a></li>
            <li role="presentation"><a href="?#!/notices" snap-close class="snap-close"><i class="glyphicon glyphicon-file"></i> Notices</a></li>
            <li role="presentation"><a href="?#!/acceptednotices" snap-close class="snap-close"><i class="glyphicon glyphicon-file"></i> Accepted Notices</a></li>
            <li role="presentation"><a href="?#!/rejectednotices" snap-close class="snap-close"><i class="glyphicon glyphicon-file"></i> Rejected Notices</a></li>
            <li role="presentation"><a href="?#!/completedarea" snap-close class="snap-close"><i class="glyphicon glyphicon-screenshot"></i> Completed Area</a></li>
            <li role="presentation"><a href="?#!/reports" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> Reports</a></li>
            <li role="presentation"><a href="?#!/tracker" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> GEPS Tracker</a></li>  
            <li role="presentation"><a href="?#!/pending" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> Pending Summary</a></li>
            <li role="presentation"><a href="?#!/myprofile" snap-close class="snap-close"><i class="glyphicon glyphicon-user"></i> My Profile</a></li>
            <li role="presentation"><a href="?#!/changepassword" snap-close class="snap-close"><i class="glyphicon glyphicon-cog"></i> Change Password</a></li>
            <li role="presentation"><a ng-click="logout()" snap-close class="snap-close"><i class="glyphicon glyphicon-off"></i> Logout</a></li>
        </ul>
	
	<!--NEWLLY ADDED FOR AMC ROLE SIDEMENUBAR-->

          <ul class="drawer-nav" ng-if="role === 'AMC'" ng-cloak>
              <li role="presentation" class="hidden-md  visible-xs-block welcomeText" snap-close> <a href="?#!/myprofile">Welcome {{userName}}</a></li>
              <li role="presentation"><a href="?#!/home" snap-close class="snap-close"><i class="glyphicon glyphicon-dashboard"></i> Home</a></li>
              <li role="presentation"><a href="?#!/newtaggedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Property Locations</a></li>
              <li role="presentation"><a href="?#!/assignedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Assigned Property</a></li>
              <li role="presentation"><a href="?#!/submittedproperty" snap-close class="snap-close">Submitted Property</a></li>
              <!--<li role="presentation"><a href="?#!/savedproperty" snap-close class="snap-close"><i class="glyphicon glyphicon-home"></i> Saved Property</a></li>
              <li role="presentation"><a href="?#!/notices" snap-close class="snap-close"><i class="glyphicon glyphicon-file"></i> Notices</a></li>
              <li role="presentation"><a href="?#!/acceptednotices" snap-close class="snap-close"><i class="glyphicon glyphicon-file"></i> Accepted Notices</a></li>
              <li role="presentation"><a href="?#!/rejectednotices" snap-close class="snap-close"><i class="glyphicon glyphicon-file"></i> Rejected Notices</a></li>
              <li role="presentation"><a href="?#!/completedarea" snap-close class="snap-close"><i class="glyphicon glyphicon-screenshot"></i> Completed Area</a></li>
              <li role="presentation"><a href="?#!/reports" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> Reports</a></li>
              <li role="presentation"><a href="?#!/tracker" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> GEPS Tracker</a></li>
              <li role="presentation"><a href="?#!/pending" snap-close class="snap-close"><i class="glyphicon glyphicon-list-alt"></i> Pending Summary</a></li>-->
              <li role="presentation"><a href="?#!/myprofile" snap-close class="snap-close"><i class="glyphicon glyphicon-user"></i> My Profile</a></li>
              <li role="presentation"><a href="?#!/changepassword" snap-close class="snap-close"><i class="glyphicon glyphicon-cog"></i> Change Password</a></li>
              <li role="presentation"><a ng-click="logout()" snap-close class="snap-close"><i class="glyphicon glyphicon-off"></i> Logout</a></li>
          </ul>
		
    </snap-drawer>
    <snap-content>
        <div id="wrap">
                    <div class="navbar-inner">
                    <div class="container">
                        <!-- Brand and toggle get grouped for better mobile display -->
                        <div class="navbar-header">
                            <a href="javascript:void(0)" snap-toggle="left" class="mob-menu">
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </a>

                            <a class="navbar-brand" href="#">
                                <img src="img/logo.png" class="desk-logo"/>
                                <img src="img/logo-mobile.png"  class="mob-logo" />
                            </a>
                        </div>
                        <!-- Collect the nav links, forms, and other content for toggling -->
                        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">        
                            <ul class="nav navbar-nav navbar-right">      
                                <li>
                                    <a href="?#!/myprofile">Welcome {{userName}} &nbsp;<!--<span class="caret"></span>--></a>
                                    <!--<ul class="dropdown-menu">
                                      <li><a href="#">Logout</a></li>
                                      <li><a href="#">Profile</a></li>           
                                    </ul>-->
                                </li>
                            </ul>
                        </div><!-- /.navbar-collapse -->
                    </div><!-- /.container-fluid -->
                </div>
            </nav>
            <div class="header-placeholder" style="display:none;"></div>  
            
            <div role="main">
                <div class="container white-bg">
                    <div class="row">
                        <div class="col-md-12">
                            <section id="uiview" ui-view></section>
                        </div>
                    </div>
                </div>
                <!-- /.container -->
            </div>
            <!-- /.main -->
            <div id="push"></div>
        </div>
        <footer class="footer">
            <div class="container">
                <p>Copyright © 2025 PMC Pune. All rights reserved. Version {{apk_version}}</p>
            </div>
        </footer>
    </snap-content>
    <!-- =================== Navigation bar =================== -->    

    <link rel="stylesheet" href="lib/openlayers/ol.css" type="text/css">
    <script src="lib/openlayers/ol.js"></script>
    <script src="lib/ol3-contextmenu/ol3-contextmenu.js"></script>
    <script src="js/map.js"></script>
    <link rel="stylesheet" href="lib/ol3-contextmenu/ol3-contextmenu.min.css" type="text/css">

    <!-- build:js scripts/vendor.js -->
    <!-- injector:bowerjs -->
    <script src="lib/jquery/dist/jquery.min.js"></script>
    <script src="lib/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="lib/angular/angular.min.js"></script>
    <script src="lib/angular-resource/angular-resource.min.js"></script>
    <script src="lib/angular-mocks/angular-mocks.js"></script>
    <script src="lib/angular-cookies/angular-cookies.min.js"></script>
    <script src="lib/angular-animate/angular-animate.min.js"></script>
    <script src="lib/angular-touch/angular-touch.min.js"></script>
    <script src="lib/angular-sanitize/angular-sanitize.min.js"></script>
    <script src="lib/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
    <script src="lib/angular-ui-utils/ui-utils.js"></script>
    <script src="lib/angular-ui-router/release/angular-ui-router.min.js"></script>
    <script src="lib/ngCordova/dist/ng-cordova.min.js"></script>
    <script src="lib/snapjs/snap.min.js"></script>
    <script src="lib/angular-snap/angular-snap.min.js"></script>
    <script src="lib/angular-ui-mask/dist/mask.min.js"></script>
    <script src="lib/angular-openlayers-directive/dist/angular-openlayers-directive.min.js"></script>
    <script src="lib/lodash/lodash.js"></script>
    <script src="lib/angular-confirm-field/app/package/js/angular-confirm-field.min.js"></script>
    <script src="lib/oi.select/dist/select-tpls.min.js"></script>
    <script src="lib/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.js"></script>
    <script src="lib/angular-pinch-zoom/dist/ng-pinch-zoom.min.js"></script>
    <!-- endinjector -->
    <!-- endbuild -->

    <!-- build:js scripts/custom.js -->
    <!-- injector:js -->
    <script src="js/config.js"></script>
    <script src="js/application.js"></script>
    <script src="modules/core/core.js"></script>
    <script src="modules/property/property.js"></script>
    <script src="modules/reports/reports.js"></script>
    <script src="modules/users/users.js"></script>
    <script src="modules/core/config/routes.js"></script>
    <script src="modules/property/config/routes.js"></script>
    <script src="modules/reports/config/routes.js"></script>
    <script src="modules/users/config/routes.js"></script>
    <script src="modules/core/services/data-service.js"></script>
    <script src="modules/core/services/pmcgis.js"></script>
    <script src="modules/core/services/rest-service.js"></script>
    <script src="modules/property/services/photo-crud.js"></script>
    <script src="modules/property/services/property_crud.js"></script>
    <script src="modules/users/services/users_crud.js"></script>
    <script src="modules/property/directives/fblindSimpleImageGallery.js"></script>
    <script src="modules/property/directives/lockProImageGallery.js"></script>
    <script src="modules/property/directives/noticeImageGallery.js"></script>
    <script src="modules/property/directives/validation.js"></script>
    <script src="modules/core/controllers/home.js"></script>
    <script src="modules/core/controllers/surveyor.js"></script>
    <script src="modules/property/controllers/accepted-notices.js"></script>
    <script src="modules/property/controllers/aform.js"></script>
    <script src="modules/property/controllers/certifiedaform.js"></script>
    <script src="modules/property/controllers/aformNotices.js"></script>
    <script src="modules/property/controllers/aformDataEntry.js"></script>
    <script src="modules/property/controllers/aform_notices_detail.js"></script>
    <script src="modules/property/controllers/aform_detail.js"></script>
    <script src="modules/property/controllers/approvereject.js"></script>
    <script src="modules/property/controllers/rejectModal.js"></script>    
    <script src="modules/property/controllers/assignedProperties.js"></script>
    <script src="modules/property/controllers/assignedproperty.js"></script>
    <script src="modules/property/controllers/comment.js"></script>
    <script src="modules/property/controllers/document_list.js"></script>
    <script src="modules/property/controllers/lockproperties.js"></script>
    <script src="modules/property/controllers/makonmap.js"></script>
    <script src="modules/property/controllers/measurementModal.js"></script>
    <script src="modules/property/controllers/measurements.js"></script>
    <script src="modules/property/controllers/newproperty.js"></script>
    <script src="modules/property/controllers/newtaggedproperty.js"></script>
    <script src="modules/property/controllers/notices-list.js"></script>
    <script src="modules/property/controllers/oldproperty.js"></script>
    <script src="modules/property/controllers/properties.js"></script>
    <script src="modules/property/controllers/propertytaxdetails.js"></script>
    <script src="modules/property/controllers/oldpropertysearchlist.js"></script>    
    <script src="modules/property/controllers/reassignedproperty.js"></script>
    <script src="modules/property/controllers/rejected-notices.js"></script>
    <script src="modules/property/controllers/savedproperty.js"></script>
    <script src="modules/property/controllers/buildingdata.js"></script>
    <script src="modules/property/controllers/building_detail.js"></script>
    <script src="modules/property/controllers/certifiedproperty.js"></script>
    <script src="modules/property/controllers/submittedproperty.js"></script>
    <script src="modules/property/controllers/takePhotoLockPro.js"></script>
    <script src="modules/property/controllers/takephoto.js"></script>
    <script src="modules/property/controllers/setImaeTitle.js"></script>
    <script src="modules/property/controllers/zoom_img.js"></script>
    <script src="modules/property/controllers/delegatedNotices-list.js"></script>
	<script src="modules/property/controllers/viewAnyAForm.js"></script>
	
    <script src="modules/reports/controllers/report.js"></script>
    <script src="modules/users/controllers/allocate-area.js"></script>
    <script src="modules/users/controllers/changepassword.js"></script>
    <script src="modules/users/controllers/completed-area.js"></script>
    <script src="modules/users/controllers/recent-survey.js"></script>
    <script src="modules/users/controllers/myprofile.js"></script>
    <script src="modules/users/controllers/user-detail.js"></script>
    <script src="modules/users/controllers/user_create.js"></script>
    <script src="modules/users/controllers/user_list.js"></script>
    <!-- Start Report -->
    <script src="modules/reports/controllers/overall.js"></script>
    <script src="modules/reports/controllers/variationReport.js"></script>
    <script src="modules/reports/controllers/variationReason.js"></script>
    <script src="modules/reports/controllers/aformPending.js"></script>
    <script src="modules/reports/controllers/returns.js"></script>
    <script src="modules/reports/controllers/returnReasons.js"></script>
     <script src="modules/reports/controllers/searchpolygonId.js"></script>
    
    <script src="modules/property/controllers/submittedpropertyvill.js"></script>
    <!--End Report  -->
    <!--Start GEPS Tracker  -->
  <script src="modules/reports/controllers/gepsTracker.js"></script>
   <script src="modules/reports/controllers/pendingSummary.js"></script>
    <script src="modules/reports/controllers/summaryDetails.js"></script>
   
    <!--End GEPS Tracker  -->
    
    <!-- endinjector -->
    <!-- endbuild -->
    <div class="preloader" ng-hide="!loading">
        <div class="pre_status" >&nbsp;</div>
    </div>
    <div class="preloader" ng-hide="!InitalLoading">
        <div class="pre_status" >&nbsp;</div>
    </div>
    <script>
        function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}
        document.cookie = '_ga=' + getCookie('_ga') + '; Secure; SameSite=None';
        document.cookie = '_ga=' + getCookie('_ga') + '; HttpOnly; SameSite=None';
    </script>
</body>
</html>
