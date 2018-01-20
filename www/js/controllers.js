angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope,$state) {

    $scope.pdf1 = 'http://www.pdf995.com/samples/pdf.pdf';
    $scope.pdf2 = "http://77.104.162.183/~alrayya3/wp-content/uploads/2018/01/P20-21.pdf";
    
    $scope.gotoPDF1 = function(){
        $state.go('pdftest',{"pdf_name":$scope.pdf1});
    }

    $scope.gotoPDF2 = function(){
        $state.go('pdftest',{"pdf_name":$scope.pdf2});
    }
     
})

.controller('PdfTestCtrl', function($scope,pdfDelegate,$ionicHistory,$timeout,$ionicLoading,$state) {

    $ionicLoading.show({
            template: 'Loading...'
    });
    console.log($state.params.pdf_name);


    //$scope.pdfUrl = 'http://77.104.162.183/~alrayya3/wp-content/uploads/2018/01/P20-21.pdf';
    $scope.pdfUrl = $state.params.pdf_name;
    
    var x = pdfDelegate.$getByHandle('my-pdf-container')
    $scope.showdata = false;
    $scope.curpage = 1;

    setTimeout(function run() {
        $scope.pagecount = x.getPageCount();
        console.log($scope.pagecount);
        if($scope.pagecount==0){
            $scope.showdata = false;
            setTimeout(run, 100);
        }else{
            $ionicLoading.hide();
            $scope.showdata = true;
        }
    
    }, 100);

    $scope.onSwipeUp = function(){
        if($scope.curpage<$scope.pagecount){
            $scope.curpage = $scope.curpage + 1;
            x.goToPage($scope.curpage);
        }
    }

    $scope.onSwipeDown = function(){
        if($scope.curpage>1){
            $scope.curpage = $scope.curpage - 1;
            x.goToPage($scope.curpage);
        }
    }

    $scope.backPage= function(){
        $ionicHistory.goBack();
    }
    
});
