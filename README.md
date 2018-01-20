## Ionic 1 Pdf Viewer with PDF Pinch to Zoom

A Example Project for PDF Viewer in Ionic Framework version 1 supporting Pinch to Zoom

## Dependencies

1. [angular-pdf-viewer](https://github.com/winkerVSbecks/angular-pdf-viewer)
1. [PDFJS](http://mozilla.github.io/pdf.js/)


## Usage

1. `bower install angular-pdf-viewer`

2. Include the path to the lib, angular-pdf-viewer and PDFJS:

```
<script src="lib/pdfjs-dist/build/pdf.js"></script>
<script src="lib/angular-pdf-viewer/dist/angular-pdf-viewer.min.js"></script>
```

3. Include the lib as a dependency in your angular app:

``` js
var app = angular.module('App', ['pdf']);
```


4. Include folowing templates in your ionic app:

### home.html
```html
    <ion-view>
        <ion-header-bar class="bar-positive">
            <h2 class="title">PDF Viewer</h2>
        </ion-header-bar>
        <ion-content padding="true">
            <div class="homeContentBtnDiv">
                <button margin-bottom class="button button-block button-large button-positive" ng-click="gotoPDF1()">PDF 1</button>
                <button class="button button-large button-block button-positive" ng-click="gotoPDF2()">PDF 2</button>
            </div>
        </ion-content>
    </ion-view>
```
### pdftest.html

``` html
    <ion-view>
        <ion-header-bar class="bar-positive">
            <button class="button button-icon ion-chevron-left backBtn" ng-click="backPage()"></button>
            <h2 class="title">PDF Viewer</h2>
        </ion-header-bar>
        <ion-content>
            <ion-scroll has-bouncing="false" id="test" max-zoom="5" min-zoom="1" scroll=false; overflow-scroll="false" zooming="true" direction="xy" style="width: 100%;" on-swipe-up="onSwipeUp()" on-swipe-down="onSwipeDown()">   
                <pdf-viewer delegate-handle="my-pdf-container" url="pdfUrl" scale="2" ></pdf-viewer>
            </ion-scroll>        
        </ion-content>
        <p class="pageNumber" ng-if="showdata">{{curpage}} / {{pagecount}}</p>
    </ion-view>
```

5. Include following code in your controller files for above views:

### HomeCtrl

```js
    .controller('HomeCtrl', function($scope,$state) {

        $scope.pdf1 = 'http://www.pdf995.com/samples/pdf.pdf';
        $scope.pdf2 = 'http://gahp.net/wp-content/uploads/2017/09/sample.pdf';
        
        $scope.gotoPDF1 = function(){
            $state.go('pdftest',{"pdf_name":$scope.pdf1});
        }

        $scope.gotoPDF2 = function(){
            $state.go('pdftest',{"pdf_name":$scope.pdf2});
        }
        
    })
```

### PdfTestCtrl

```js
    .controller('PdfTestCtrl', function($scope,pdfDelegate,$ionicHistory,$timeout,$ionicLoading,$state) {

        $ionicLoading.show({
                template: 'Loading...'
        });
        console.log($state.params.pdf_name);
        
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
```

6. CSS for the PDF View in style.css:

### style.css

```css
    canvas  {
        width:100%;
    }
    .pageNumber{
        text-align: center;
        font-weight: bold;
        margin: 10px 0px;
        position: absolute;
        width: 100%;
        bottom: 6px;
    }
    .scroll-bar{
        display: none;
    }
```


## Example

Run `npm install && bower install` to install all dependencies. And then `ionic serve` to start a local server. 


## Similar projects

1. [angularjs-pdf](https://github.com/sayanee/angularjs-pdf)
2. [ng-pdfviewer](https://github.com/akrennmair/ng-pdfviewer)


## Credits

Mozilla for PDF.js and @winkerVSbecks for angular-pdf-viewer project
