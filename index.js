'use strict';
/**
 * @ngdoc object
 * @name core.Controllers.MeasurementsController
 * @description Measurements controller
 * @requires ng.$scope
 */
angular
        .module('core')
        .controller('MeasurementsController', ['$scope', '$rootScope', 'RestService', '$state', '$cordovaDialogs',
            function($scope, $rootScope, RestService, $state, $cordovaDialogs) {

                $scope.aFormId = $rootScope.aform_id;//$state.params.id;
                $rootScope.searched_aform = 0;
                $scope.total_sqft = 0;
                $scope.total_er = 0;
                $scope.total_cr = 0;
                $scope.total_arv = 0;
                $scope.final_arv = 0;

                $scope.previousRateValNivasi = 0;
                $scope.previousRateValBNivasi = 0;
                $scope.previousRateValOpenPlot = 0;


//                $scope.postRateValNivasi = Number($scope.previousRateValNivasi) + Number($scope.currentRateValNivasi);
//                $scope.postRateValBNivasi = Number($scope.previousRateValBNivasi) + Number($scope.currentRateValBNivasi);
//                $scope.postRateValOpenPlot = Number($scope.previousRateValOpenPlot) + Number($scope.currentRateValOpenPlot);

                $scope.oneSqMeter = "10.7639104";   // 1 Square Meter = 10.7639 Square Foot

                $scope.use_dd = "";
                $scope.sub_type = "";

                // initialize the Measurement Array
                //$scope.measurementListArray = [{ "lengthMtr": "","widthMtr": "","sqMtr": "","sqFt": "","Type": "","use": "","halfrate": "","rate": "","percentage": ""}];
                //$scope.measurementListArray = [];
                $scope.formFields = [];
                $scope.SqMtrFtArray = [];
                $scope.IsVisible = false;
                $scope.IsVisible_PropertyDetail = false;
                $scope.new_measurement = {};
                $scope.new_measurement.ARREARS = '';
                $scope.new_measurement.VILLTAXAMOUNT = '';
                $scope.new_measurement.VILLPROPERTYID = '';

                $scope.aFormMesurementList = [];

                $scope.use_dd = [
                    {name: 'Hall', value: 'Hall'},
                    {name: 'Kitchen', value: 'Kitchen'},
                    {name: 'Bedroom', value: 'Bedroom'},
                    {name: 'WC', value: 'WC'},
                    {name: 'Bathroom', value: 'Bathroom'},
                    {name: 'Passage', value: 'Passage'},
                    {name: 'Balcony', value: 'Balcony'},
                    {name: 'Store/Study/Pooja', value: 'Store/Study/Pooja'},
                    {name: 'Terrace', value: 'Terrace'},
                    {name: 'Swimming Pool', value: 'Swimming Pool'},
                    {name: 'Club house', value: 'Club house'},
                    {name: 'Other', value: 'Other'}

                ];

                $scope.nivasi_type = [
                    {name: 'à¤¨à¤¿à¤µà¤¾à¤¸à¥€', value: 'R'},
                    {name: 'à¤¬à¤¿à¤—à¤° à¤¨à¤¿à¤µà¤¾à¤¸à¥€', value: 'N'},
                    {name: 'à¤“à¤ªà¤¨ à¤ªà¥à¤²à¥‰à¤Ÿ', value: 'O'},
                    {name: 'Parking', value: 'P'},
                ];

                $scope.sub_type_R = [
                    {name: 'RCC', value: 'RCC'},
                    {name: 'Load Bearing', value: 'Load Bearing'},
                    {name: 'Patra Shed', value: 'Patra Shed'},
                ];

                $scope.sub_type_N = [
                    {name: 'RCC', value: 'Shop RCC'},
                    {name: 'Load Bearing', value: 'Shop Load Bearing'},
                    {name: 'Patra Shed', value: 'Shop Patra Shed'},
                    {name: 'Office', value: 'Office'},
                ];

                $scope.sub_type_O = [
                    {name: 'Basement commercial use', value: 'Basement commercial use'},
                    {name: 'Open', value: 'Open'}
                ];

                $scope.sub_type_P = [
                    {name: 'Nivasi', value: 'Nivasi'},
                    {name: 'Bigar Nivasi', value: 'Bigar Nivasi'}
                ];

                $scope.popup1 = {
                    opened: false
                };

                $scope.open1 = function() {
                    $scope.popup1.opened = true;
                };

                $scope.popup2 = {
                    opened: false
                };

                $scope.open2 = function() {
                    $scope.popup2.opened = true;
                };

                $scope.popup3 = {
                    opened: false
                };

                $scope.open3 = function() {
                    $scope.popup3.opened = true;
                };

                /**
                 * @description Get Property Info From aFormId
                 * @Created By : Prasad 
                 * @Creatde Date : 06-08-2016 
                 */

                $scope.getPropertyMeasurementList = function(aFormId) {

                    RestService.getMeasurementInfoList(aFormId).success(function(data)
                    {

                        if (data.status == 'success' && data.totalItems > 0) {
                            $rootScope.loading = false;
                            //var resut=angular.fromJson(jsonObject.result);

                            $scope.aFormMesurementList = data.result;
                            //$scope.measurementListArray = data.result;
                            // Calculation Perfom here  
                            $scope.calculateARV($scope.aFormMesurementList);

                        } else {
                            $rootScope.loading = false;

                            if (data.status === 'Invalid Token') {
                                alert(data.message);
                                $rootScope.invalidToken();
                            }
                        }

                    }).error(function(error) {
                        $rootScope.loading = false;
                        alert("Error in connection.");
                    });
                };

                /**
                 * @description Get aForm Detail
                 * @Created By : Prasad 
                 * @Creatde Date : 12-08-2016 
                 */

                $scope.getAFormDetail = function(aFormId) {

                    $rootScope.loading = true;
                    RestService.getAFormById(aFormId).success(function(data)
                    {
                        // var jsonObject = angular.fromJson(data);
                        //console.log(jsonObject);
                        if (data.status === 'success') {
                            $rootScope.loading = false;
                            //console.log(angular.fromJson(jsonObject.result));
                            $scope.aForm = data.result;

                            $scope.specialRemark = $scope.aForm.specialRemark;
                            if ($scope.aForm.preRateValNivasi !== '' && $scope.aForm.preRateValNivasi !== null && typeof ($scope.aForm.preRateValNivasi) !== 'undefined')
                                $scope.previousRateValNivasi = $scope.aForm.preRateValNivasi;
                            if ($scope.aForm.previousRateValBNivasi !== '' && $scope.aForm.previousRateValBNivasi !== null && typeof ($scope.aForm.previousRateValBNivasi) !== 'undefined')
                                $scope.previousRateValBNivasi = $scope.aForm.previousRateValBNivasi;
                            if ($scope.aForm.previousRateValOpenPlot !== '' && $scope.aForm.previousRateValOpenPlot !== null && typeof ($scope.aForm.previousRateValOpenPlot) !== 'undefined')
                                $scope.previousRateValOpenPlot = $scope.aForm.previousRateValOpenPlot;
                            //Get Property Measurement Listing
                            $scope.getPropertyMeasurementList(aFormId);

//                            $scope.postRateValNivasi = parseFloat($scope.previousRateValNivasi) + parseFloat($scope.currentRateValNivasi);
//                            $scope.postRateValBNivasi = parseFloat($scope.previousRateValBNivasi) + parseFloat($scope.currentRateValBNivasi);
//                            $scope.postRateValOpenPlot = parseFloat($scope.previousRateValOpenPlot) + parseFloat($scope.currentRateValOpenPlot);
                            console.log($scope.aForm);


                        } else {
                            $rootScope.loading = false;
                            // alert("Invalid Property Id");
                            $scope.aForm = "";
                            $scope.propertId = "";
                            alert(data.message);
                            if (data.status === 'Invalid Token') {
                                $rootScope.invalidToken();
                            }
                        }

                    }).error(function(error) {
                        $rootScope.loading = false;
                        alert("Error in connection.");
                    });
                };




                $scope.ShowHide = function() {
                    //If DIV is visible it will be hidden and vice versa.
                    $scope.IsVisible = $scope.search_from_property;
                }


                $scope.changedValue = function(item) {

                    switch (item)
                    {
                        case 'R':
                            $scope.sub_type = $scope.sub_type_R;
                            $scope.disableByType = false;
                            break;
                        case 'N':
                            $scope.sub_type = $scope.sub_type_N;
                            $scope.disableByType = true;
                            $scope.chkUnchkByType = false;
                            $scope.new_measurement.USED = '';
                            $scope.new_measurement.SUBTYPE = '';

                            break;
                        case 'O':
                            $scope.sub_type = $scope.sub_type_O;
                            $scope.disableByType = true;
                            $scope.chkUnchkByType = false;
                            $scope.new_measurement.USED = '';
                            $scope.new_measurement.SUBTYPE = '';
                            break;
                        case 'P':
                            $scope.sub_type = $scope.sub_type_P;
                            $scope.disableByType = true;
                            $scope.chkUnchkByType = false;
                            $scope.new_measurement.USED = '';
                            $scope.new_measurement.SUBTYPE = '';
                            break;
                        default:
                            $scope.sub_type = "";
                            break;
                    }
                }


                /**
                 * @description Open Add Measurement Popup 
                 * @Created By : Prasad 
                 * @Creatde Date : 06-08-2016 
                 */

                $scope.openAddMeasurementPopup = function(isValid) {
                    $('#add-row-form').modal({'backdrop': 'static', 'show': true});
                    $scope.new_measurement = {'PARAMTYPE': 'R', 'SUBTYPE': 'RCC'};
                    $scope.changedValue('R');

                };


                /**
                 * @description Save MeasurementInfo
                 * @Created By : Prasad 
                 * @Creatde Date : 06-08-2016 
                 */

                $scope.addMeasurementInfoRow = function(flag) {

                    if (angular.isUndefined($scope.aFormId))
                    {
                        alert("Invalid Property Id");
                        return false;
                    }
                    else
                    {
                        $rootScope.loading = true;


                        $scope.formFields = this.new_measurement;
                        $scope.SqMtr_val = (parseFloat(this.new_measurement.PARAMLENGTH) * parseFloat(this.new_measurement.PARAMWIDTH));

                        $scope.SqFt_val = (parseFloat($scope.SqMtr_val) * parseFloat($scope.oneSqMeter)).toFixed(2);

                        $scope.SqMtrFtArray = ({
                            "PARAMAFORM_ID": $scope.aFormId,
                            "PARAMSQMTR": Math.round($scope.SqMtr_val),
                            "PARAMSQFT": $scope.SqFt_val,
                            "PARAMISDELETED": "0",
                            "PARAMCREATEDBY": "1",
                            "PARAMMODIFIEDBY": 0
                        });

                        // Merge two Arrays
                        angular.extend($scope.formFields, $scope.SqMtrFtArray);



//                        if ($rootScope.searched_aform > 0 && $scope.savedMesurementList != "")
//                        {
//
//                            $scope.savedPrArray = ({
//                                "PARAMAFORM_ID": $scope.aFormId,
//                                "PARAMCREATEDBY": "1",
//                                "PARAMISDELETED": "0",
//                                "PARAMLENGTH": $scope.savedMesurementList[0]["PARAMLENGTH"],
//                                "PARAMMODIFIEDBY": 0,
//                                "PARAMRATE": $scope.savedMesurementList[0]["PARAMRATE"],
//                                "PARAMSQFT": $scope.savedMesurementList[0]["PARAMSQFT"],
//                                "PARAMSQMTR": $scope.savedMesurementList[0]["PARAMSQMTR"],
//                                "PARAMTYPE": $scope.savedMesurementList[0]["PARAMTYPE"],
//                                "PARAMWIDTH": $scope.savedMesurementList[0]["PARAMWIDTH"],
//                                "USED": $scope.savedMesurementList[0]["USED"]
//
//                            });
//
//
//                            $scope.measurementListArray.push($scope.savedPrArray);
//                            $scope.savedMesurementList = "";
//
//
//
//                        }
                        // Push data in Measurement List Array tobe Dsplayed
                        $scope.aFormMesurementList.push($scope.formFields);

                        //console.log("After");
                        //console.log($scope.measurementListArray);

                        //$scope.aFormMesurementList = $scope.measurementListArray;

                        // console.log($scope.aFormMesurementList);

                        // Calculation Perfom here  
                        $scope.calculateARV($scope.aFormMesurementList);

                        if (flag == "update")
                        {
                            $('#edit-measurement-form').modal('hide');
                        }
                        else
                        {
                            $('#add-row-form').modal('hide');
                        }

                        $rootScope.loading = false;
                    }
                }


                /**
                 * @description Update MeasurementInfo
                 * @Created By : Prasad 
                 * @Creatde Date : 10-08-2016 
                 */

                $scope.updateMeasurementInfo = function(index) {

                    $scope.removeMeasurementRow(index, 'update');
                    $scope.addMeasurementInfoRow('update');
                }


                /**
                 * @description Calculate ARV For Property
                 * @Created By : Prasad 
                 * @Creatde Date : 07-08-2016 
                 */
                $scope.calculateARV = function(formValues) {

                    // console.log(formValues);
                    if (formValues.length > 0)
                    {
                        $scope.final_arv = 0;
                        $scope.final_total_sqft = 0;
                        $scope.final_er = 0;
                        $scope.totalCurrentRetablevalNivasi = 0;
                        $scope.totalCurrentRetablevalBNivasi = 0;
                        $scope.totalCurrentRetablevalOpenPlot = 0;

//                        $scope.previousRateValNivasi = 0;
//                        $scope.previousRateValBNivasi = 0;
//                        $scope.previousRateValOpenPlot = 0;

                        angular.forEach(formValues, function(value, key)
                        {

                            $scope.SqMtr_val = value.PARAMSQMTR;
                            $scope.SqFt_val = value.PARAMSQFT;


                            // If Half Rate Checkbox is Selected
                            if (value.PARAMHALFRATE == true)
                            {
                                $scope.half_rate_val = '0.5';
                            }
                            else
                            {
                                $scope.half_rate_val = 1;
                            }

                            // If Percentge is Selected
                            if (value.PARAMPERCENTAGE == 60)
                            {
                                $scope.percentage_val = '0.6';
                            }
                            else
                            {
                                $scope.percentage_val = 1;
                            }

                            if (angular.isUndefined(value.PARAMRATE))
                            {
                                value.PARAMRATE = 0;
                            }


                            switch (value.PARAMTYPE)
                            {
                                case 'R':    //Nivasi
                                    $scope.stepA = (parseFloat($scope.SqFt_val) * parseFloat(value.PARAMRATE) * parseFloat($scope.half_rate_val) * parseFloat($scope.percentage_val)).toFixed(2);
                                    $scope.stepB = (parseFloat($scope.stepA) * parseFloat(12)).toFixed(2);   //Calculate For Year
                                    $scope.stepC = (parseFloat($scope.stepB) * parseFloat(0.9)).toFixed(2); // 15% Discount is applied
                                    $scope.ER_cal = (parseFloat($scope.SqFt_val) * parseFloat(value.PARAMRATE) * 12).toFixed(2);  // Calculate ER

                                    // Current Retable Value Vivasi
                                    $scope.totalCurrentRetablevalNivasi = (parseFloat($scope.totalCurrentRetablevalNivasi) + parseFloat($scope.stepC)).toFixed(2);

                                    break;

                                case 'N':   //Bigar Nivasi
                                    $scope.stepA = (parseFloat($scope.SqFt_val) * parseFloat(value.PARAMRATE)).toFixed(2);
                                    $scope.stepB = (parseFloat($scope.stepA) * parseFloat(12)).toFixed(2);   //Calculate For Year
                                    $scope.stepC = (parseFloat($scope.stepB) * parseFloat(0.9)).toFixed(2); // 15% Discount is applied

                                    $scope.ER_cal = $scope.stepB;  // Calculate ER

                                    // Current Retable Value Bigar Nivasi
                                    $scope.totalCurrentRetablevalBNivasi = (parseFloat($scope.totalCurrentRetablevalBNivasi) + parseFloat($scope.stepC)).toFixed(2);
                                    break;

                                case 'O':   //Open Plot
                                    $scope.stepA = (parseFloat($scope.SqFt_val) * parseFloat(value.PARAMRATE)).toFixed(2);
                                    $scope.stepB = (parseFloat($scope.stepA) * parseFloat(12)).toFixed(2);   //Calculate For Year
                                    $scope.stepC = $scope.stepB;

                                    $scope.ER_cal = $scope.stepB;  // Calculate ER

                                    // Current Retable Value Open Plot
                                    $scope.totalCurrentRetablevalOpenPlot = (parseFloat($scope.totalCurrentRetablevalOpenPlot) + parseFloat($scope.stepC)).toFixed(2);

                                    break;

                                case 'P':  //Parking 
                                    $scope.stepA = (parseFloat($scope.SqFt_val) * parseFloat(value.PARAMRATE)).toFixed(2);
                                    $scope.stepB = (parseFloat($scope.stepA) * parseFloat(12)).toFixed(2);   //Calculate For Year
                                    $scope.stepC = (parseFloat($scope.stepB) * parseFloat(0.9)).toFixed(2); // 15% Discount is applied

                                    $scope.ER_cal = $scope.stepB;  // Calculate ER

                                    if (value.SUBTYPE == "Nivasi")
                                    {
                                        // Current Retable Value Nivasi
                                        $scope.totalCurrentRetablevalNivasi = (parseFloat($scope.totalCurrentRetablevalNivasi) + parseFloat($scope.stepC)).toFixed(2);
                                    }
                                    else
                                    {
                                        // Current Retable Value Bigar Nivasi
                                        $scope.totalCurrentRetablevalBNivasi = (parseFloat($scope.totalCurrentRetablevalBNivasi) + parseFloat($scope.stepC)).toFixed(2);
                                    }


                                    break;
                            }

                            // Total Square Feet
                            $scope.final_total_sqft = (parseFloat($scope.final_total_sqft) + parseFloat($scope.SqFt_val)).toFixed(2);


                            // Total ER
                            $scope.final_er = (parseFloat($scope.final_er) + parseFloat($scope.ER_cal)).toFixed(2);


                            // Total ARV
                            $scope.final_arv = (parseFloat($scope.final_arv) + parseFloat($scope.stepC)).toFixed(2);

                        });


                        $scope.total_sqft = $scope.final_total_sqft;

                        // $scope.total_er = Math.round($scope.final_er);

                        //====== Apply Rounding on ARV ======//
                        //$scope.total_arv =$scope.applyRoundingOnNumber($scope.final_arv);


                        //====== Apply Rounding on ER ======//

                        $scope.total_er = $scope.applyRoundingOnNumber($scope.final_er);

                        //======== Apply Rounding on CurrentRetable Nivasi =====//
                        $scope.currentRateValNivasi = $scope.applyRoundingOnNumber($scope.totalCurrentRetablevalNivasi);

                        //======== Apply Rounding on CurrentRetable Bigar Nivasi =====//
                        $scope.currentRateValBNivasi = $scope.applyRoundingOnNumber($scope.totalCurrentRetablevalBNivasi);

                        //======== Apply Rounding on CurrentRetable Open Plot =====//
                        $scope.currentRateValOpenPlot = $scope.applyRoundingOnNumber($scope.totalCurrentRetablevalOpenPlot);


                        // ============Calculate Total ARV ===============//
                        $scope.total_arv = $scope.currentRateValNivasi + $scope.currentRateValBNivasi + $scope.currentRateValOpenPlot;

                        $scope.postRateValNivasi = parseFloat($scope.previousRateValNivasi) + parseFloat($scope.currentRateValNivasi);
                        //alert($scope.postRateValNivasi + "~~" + $scope.previousRateValNivasi + "===>" + $scope.currentRateValNivasi);
                        $scope.postRateValBNivasi = parseFloat($scope.previousRateValBNivasi) + parseFloat($scope.currentRateValBNivasi);

                        //alert($scope.previousRateValBNivasi + "~~" + $scope.currentRateValBNivasi + "===>" + $scope.postRateValBNivasi);

                        $scope.postRateValOpenPlot = parseFloat($scope.previousRateValOpenPlot) + parseFloat($scope.currentRateValOpenPlot);

                        //alert($scope.previousRateValOpenPlot + "~~" + $scope.currentRateValOpenPlot + "===>" + $scope.postRateValOpenPlot);
                    }
                    else
                    {
                        $scope.total_sqft = 0;
                        $scope.total_er = 0
                        $scope.total_arv = 0;

                    }
                }


                $scope.applyRoundingOnNumber = function(orgVal) {

                    var mod = orgVal % 50;
                    var mul = Math.floor(orgVal / 50);

                    if (mod >= 25)
                    {
                        mul = mul + 1;
                    }

                    var rounding_arv = 50 * mul;

                    console.log("----" + orgVal + "------" + rounding_arv);
                    // $scope.total_arv  = $scope.final_arv;
                    return rounding_arv;

                }

                /**
                 * @description Save MeasurementInfo in Bulk
                 * @Created By : Prasad 
                 * @Creatde Date : 10-08-2016 
                 */
                $scope.saveMeasurementValues = function() {

                    $rootScope.loading = true;
                    //console.log($scope.aFormMesurementList);
                    $scope.cr_val = $scope.total_er - $scope.total_arv;

                    alert($scope.currentRateValOpenPlot);

                    $scope.totalCalculation = ({
                        "totalSqFt": $scope.total_sqft,
                        "er": $scope.total_er,
                        "cr": $scope.cr_val,
                        "cp": "0",
                        "arv": $scope.total_arv,
                        "specialRemark": $scope.specialRemark,
                        "currentRateValNivasi": $scope.currentRateValNivasi,
                        "currentRateValBNivasi": $scope.currentRateValBNivasi,
                        "currentRateValOpenPlot": $scope.currentRateValOpenPlot,
                        "postRateValNivasi": $scope.postRateValNivasi, //(parseFloat($scope.previousRateValNivasi) + parseFloat($scope.currentRateValNivasi)),
                        "postRateValBNivasi": $scope.postRateValBNivasi, //(parseFloat($scope.previousRateValBNivasi) + parseFloat($scope.currentRateValBNivasi)),
                        "postRateValOpenPlot": $scope.postRateValOpenPlot, //(parseFloat($scope.previousRateValOpenPlot) + parseFloat($scope.currentRateValOpenPlot)),
                        "preRateValBNivasi": $scope.previousRateValBNivasi,
                        "preRateValNivasi": $scope.previousRateValNivasi,
                        "preRateValOpenPlot": $scope.previousRateValOpenPlot
                    });

                    RestService.insertBulkMeasurementInfo($scope.aFormMesurementList, $scope.aFormId, $scope.totalCalculation).success(function(data)
                    {
                        var jsonObject = angular.fromJson(data);
                        //console.log(jsonObject);
                        if (jsonObject.status === 'success') {
                            $rootScope.loading = false;
                            alert("Property measurement information has been saved successfully.");
                            $('#add-row-form').modal('hide');

                            $rootScope.aform_id = $scope.aFormId;
                            $state.go('aformdetail');

                            //Get Property Measurement Listing
                            //$scope.getPropertyMeasurementList($scope.aFormId);

                        } else {
                            $rootScope.loading = false;
                            alert(jsonObject.message);
                            if (jsonObject.status === 'Invalid Token') {
                                $rootScope.invalidToken();
                            }
                        }

                    }).error(function(error) {
                        $rootScope.loading = false;
                        alert("Error in connection.");
                    });
                }

                /**
                 * @description Remove Measurement Row From Array
                 * @Created By : Prasad 
                 * @Creatde Date : 10-08-2016 
                 */

                $scope.removeMeasurementRow = function(index, flag) {


                    if (flag == "update")
                    {
                        $scope.aFormMesurementList.splice([index], 1);
                        // Calculation Perfom here  
                        $scope.calculateARV($scope.aFormMesurementList);
                    }
                    else
                    {
                        $cordovaDialogs.confirm("Are you sure, want to delete this row?", 'Confirm', ['Ok', 'Cancel']).then(function(result) {

                            var btnIndex = JSON.stringify(result);
                            if (btnIndex == '1') {

                                $scope.aFormMesurementList.splice([index], 1);
                                // Calculation Perfom here  
                                $scope.calculateARV($scope.aFormMesurementList);
                            }
                        });

                    }

                };

                /**
                 * @description Display Info in Edit Mode
                 * @Created By : Prasad 
                 * @Creatde Date : 10-08-2016 
                 */

                $scope.editMeasurementdata = function(index) {
                    $('#edit-measurement-form').modal({'backdrop': 'static', 'show': true});
                    $scope.new_measurement = $scope.aFormMesurementList[index];

                    $scope.changedValue($scope.aFormMesurementList[index]["PARAMTYPE"]);
                };

                /**
                 * @description Get Property Info From VeriFicaton Code
                 * @Created By : Prasad 
                 * @Creatde Date : 06-08-2016 
                 */

                $scope.getPropertyInfo = function(isValid) {

                    if (isValid)
                    {
                        $rootScope.loading = true;

                        RestService.getAFormInfoByVerificationNumber($scope.verificationNumber).success(function(data)
                        {
                            var jsonObject = angular.fromJson(data);
                            //console.log(jsonObject);
                            if (jsonObject.status === 'success') {
                                $rootScope.loading = false;
                                $scope.aFormV = angular.fromJson(jsonObject.result);

                                //Get AForm Detail
                                RestService.getAFormById($scope.aFormV.aFormId).success(function(data)
                                {
                                    if (data.status === 'success')
                                    {
                                        $rootScope.loading = false;
                                        //console.log(angular.fromJson(jsonObject.result));
                                        $scope.aFormSearch = data.result;
                                        $scope.IsVisible_PropertyDetail = true;
                                        $scope.specialRemark = $scope.aFormSearch.specialRemark;

                                    }
                                    else
                                    {
                                        $rootScope.loading = false;
                                        // alert("Invalid Property Id");
                                        $scope.aFormSearch = "";
                                        $scope.propertId = "";
                                    }

                                }).error(function(error) {
                                    $rootScope.loading = false;
                                    alert("Error in connection.");
                                });


                                // Get Measurement Info  
                                RestService.getMeasurementInfoList($scope.aFormV.aFormId).success(function(measurement_data)
                                {

                                    if (data.status == 'success' && measurement_data.totalItems > 0)
                                    {
                                        $rootScope.loading = false;
                                        $scope.showCopyButton = true;
                                        $rootScope.searched_aform = $scope.aFormV.aFormId;
                                    }
                                    else
                                    {
                                        $rootScope.loading = false;
                                        $rootScope.searched_aform = 0;
                                    }

                                }).error(function(error) {
                                    $rootScope.loading = false;
                                    alert("Error in connection.");
                                });

                            } else {
                                $rootScope.loading = false;
                                $scope.IsVisible_PropertyDetail = false;
                                alert("Invalid Property Id");
                                $scope.aForm = "";
                                $scope.propertId = "";
                            }

                        }).error(function(error) {
                            $rootScope.loading = false;
                            alert("Error in connection.");
                        });


                    }
                };

                /**
                 * @description Copy Measurement Info From aFormId
                 * @Created By : Prasad 
                 * @Creatde Date : 06-08-2016 
                 */
                $scope.copyMeasurementInfo = function() {

                    RestService.getMeasurementInfoList($rootScope.searched_aform).success(function(measurement_data)
                    {
                        if (measurement_data.status == 'success' && measurement_data.totalItems > 0) {
                            $rootScope.loading = false;
                            //$scope.savedMesurementList = measurement_data.result;
                            //$scope.aFormMesurementList = $scope.savedMesurementList;
                            angular.forEach(measurement_data.result, function(value, key)
                            {
                                var temp = {
                                    PARAMAFORM_ID: $scope.aFormId,
                                    PARAMCREATEDBY: 1,
                                    PARAMHALFRATE: value.PARAMHALFRATE,
                                    PARAMISDELETED: "0",
                                    PARAMLENGTH: value.PARAMLENGTH,
                                    PARAMMODIFIEDBY: 0,
                                    PARAMPERCENTAGE: value.PARAMPERCENTAGE,
                                    PARAMRATE: value.PARAMRATE,
                                    PARAMSQFT: value.PARAMSQFT,
                                    PARAMSQMTR: value.PARAMSQMTR,
                                    PARAMTYPE: value.PARAMTYPE,
                                    PARAMWIDTH: value.PARAMWIDTH,
                                    SUBTYPE: value.SUBTYPE,
                                    USED: value.USED,
                                    USED_OTHER: value.USED_OTHER
                                };
                                $scope.aFormMesurementList.push(temp);
                            });

                            $scope.showCopyButton = false;
                            // Calculation Perfom here  
                            $scope.calculateARV($scope.aFormMesurementList);

                        } else {
                            $rootScope.loading = false;
                            alert(measurement_data.message);
                            if (measurement_data.status === 'Invalid Token') {
                                $rootScope.invalidToken();
                            }
                        }
                    }).error(function(error) {
                        $rootScope.loading = false;
                        alert("Error in connection.");
                    });
                }

                $scope.resetMeasurementValues = function() {

                    $scope.aFormMesurementList = [];
                    //$scope.measurementListArray = [];
                    $scope.aForm = "";
                    $scope.specialRemark = "";

                    $scope.total_sqft = 0;
                    $scope.total_er = 0;
                    $scope.total_cr = 0;
                    $scope.total_arv = 0;
                    $scope.final_arv = 0;

//                    $scope.previousRateValNivasi = 0;
//                    $scope.previousRateValBNivasi = 0;
//                    $scope.previousRateValOpenPlot = 0;

                    $scope.currentRateValOpenPlot = 0;
                    $scope.currentRateValNivasi = 0;
                    $scope.currentRateValBNivasi = 0;

                    $scope.getAFormDetail($scope.aFormId);

                };

                // Call Function On Load
                //$scope.getPropertyMeasurementList($scope.aFormId);
                $scope.getAFormDetail($scope.aFormId);
            }
        ]);
