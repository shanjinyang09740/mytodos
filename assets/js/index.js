angular.module('todos',[])
	.controller('todosCtrl',['$scope',function($scope){
		//0 获取数据
		//任务列表数组
		$scope.taskList=[];

		getTask();
		function getTask(){
			if(localStorage.getItem('taskList')){
				//fromJson 将json字符串转换为对象
				$scope.taskList=angular.fromJson(localStorage.getItem('taskList'));
			}
		}




		//1.添加任务
		/*
			1.获取到用户输入的任务的内容
			2.准备一个存储任务列表的数组
			3、监听用户的回车事件、
			4、将用输入的任务内容添加到任务列表中
			5、利用ng-repeat指令将任务列表展现到页面中
		*/
		
		$scope.addTask=function(event){
			if(event.keyCode==13 && $scope.task){
				//向任务列表中添加任务
				$scope.taskList.push({
					name:$scope.task,
					isCompleted:false, //任务是否完成的状态
					isEditing:false //任务是否处于编辑状态
				});

				//清空文本框的值
				$scope.task="";
			}
		}
		/*2.删除任务
			1、给删除按钮添加点击事件
			2、将要删除的任务传给事件处理函数
			3、从数组中将数据删除
		*/
		$scope.deleteTask=function(task){
			$scope.taskList.splice($scope.taskList.indexOf(task),1);
		}

		//3.计算未完成的任务的数量
		$scope.unCompletedTaskNum=function(){
			return $scope.taskList.filter(item=>!item.isCompleted).length;
		}

		//4.清空已完成的任务
		$scope.clearCompleted=function(){
			$scope.taskList=$scope.taskList.filter(item=>!item.isCompleted);

		}

		//5.点击复选框All，显示所有已完成的任务
		$scope.checkAllCompleted=function(){
			// alert(123);
			$scope.taskList.forEach(item=>item.isCompleted=$scope.status);
		}

		//6.点击复选框按钮，按钮高亮显示切换
			 //当未完成的任务的数量为零时，按钮高亮显示

		$scope.updateStatus=function(){
			$scope.status=$scope.taskList.filter(item=>!item.isCompleted).length==0;
		}

		//7.进行全部任务、已完成任务及未完成任务按钮操作
			//默认显示全部任务
			$scope.filterType='';
			$scope.selected='all';

			$scope.filterData=function(type){
				switch(type){
					case 'All':
					$scope.filterType='';
					$scope.selected='All';
					break;

					case 'Active':
						$scope.filterType=false;
						$scope.selected='Active';
						break;

					case 'Completed':
						$scope.filterType=true;
						$scope.selected='Completed';
						break;

				}

			};

		//8.修改任务名称，
			// 1.给任务添加双击事件
			// 2.将当前任务更改为编辑状态，将其他任务取消编辑状态
			// 3.将数据和修改任务的文本框做绑定
			// 4、完成修改
		$scope.editTask=function(task){
			//将全部任务的编辑状态设定为 不可编辑
			$scope.taskList.forEach(item=>item.isEditing=false);

			//将当前任务的编辑状态设定为 可编辑
			$scope.taskList[$scope.taskList.indexOf(task)].isEditing=true;

		};

		//9.给编辑文本框绑定失去焦点事件
		$scope.cancelEdit=function(){
			//将全部任务的可编辑状态取消
			$scope.taskList.forEach(item=>item.isEditing=false);
		};


		//通过深度监听（$watch设定true），存储数据
		//这里的taskList实际是$scope.taskList
		//angular.toJson将对象转换为json格式的字符串
		$scope.$watch('taskList',function(){
			localStorage.setItem('taskList',angular.toJson($scope.taskList));

		},true);
	}])

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