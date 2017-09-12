angular.module('directive',[])
	//10.给编辑文本框添加获取焦点事件
	.directive('inpFocus',['$timeout',function($timeout){
		return {
			restrict:'A',
			link:function(scope,element,attributes){
				console.log(scope.item.isEditing);
				//当item.isEditing的值为true时，获取当前文本框的焦点
				scope.$watch('item.isEditing',function(newvalue){
					console.log(element);
					if(newvalue){
						//事件序列，添加$timeout可以确保focus()可以在文本框显示之后执行获取焦点事件
						$timeout(function(){
							element[0].focus();
						},0);
					}
				})

			}
		}
	}])