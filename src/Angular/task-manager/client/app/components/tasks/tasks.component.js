"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var task_service_1 = require("../../services/task.service");
var TasksComponent = (function () {
    function TasksComponent(taskService) {
        var _this = this;
        this.taskService = taskService;
        this.taskService.getTasks()
            .subscribe(function (tasks) {
            _this.tasks = tasks;
            _this.multiCheck = tasks.every(function (x) { return x.isDone == true; });
        });
    }
    TasksComponent.prototype.addTask = function (event) {
        var _this = this;
        event.preventDefault();
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        var newTask = {
            title: this.title,
            isDone: false,
            datetime: datetime
        };
        if (typeof newTask.title !== 'undefined') {
            this.taskService.addTask(newTask)
                .subscribe(function (task) {
                _this.tasks.push(task);
                _this.title = '';
                _this.multiCheck = _this.tasks.every(function (x) { return x.isDone == true; });
            });
        }
    };
    TasksComponent.prototype.deleteTask = function (id) {
        var _this = this;
        var tasks = this.tasks;
        this.taskService.deleteTask(id)
            .subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i]._id == id) {
                        tasks.splice(i, 1);
                        _this.multiCheck = _this.tasks.every(function (x) { return x.isDone == true; });
                    }
                }
            }
        });
    };
    TasksComponent.prototype.updateStatus = function (task) {
        var _this = this;
        var _task = {
            _id: task._id,
            title: task.title,
            isDone: !task.isDone
        };
        this.taskService.updateStatus(_task)
            .subscribe(function (data) {
            task.isDone = !task.isDone;
            _this.multiCheck = _this.tasks.every(function (x) { return x.isDone == true; });
        });
    };
    TasksComponent.prototype.updateAllStatus = function (event) {
        var _this = this;
        var isDone = false;
        if (event.target.checked) {
            isDone = true;
        }
        this.taskService.updateAllStatus(isDone)
            .subscribe(function (data) {
            _this.tasks.forEach(function (item) {
                item.isDone = isDone;
            });
            _this.multiCheck = _this.tasks.every(function (x) { return x.isDone == true; });
        });
    };
    TasksComponent.prototype.searchTasks = function () {
        var _this = this;
        var title = typeof this.searchValue !== 'undefined' ? this.searchValue : '';
        if (title.trim().length) {
            this.taskService.getByName(title)
                .subscribe(function (data) {
                _this.tasks = data;
                _this.multiCheck = data.every(function (x) { return x.isDone == true; });
            });
        }
        else {
            this.taskService.getTasks()
                .subscribe(function (data) {
                _this.tasks = data;
                _this.multiCheck = data.every(function (x) { return x.isDone == true; });
            });
        }
    };
    return TasksComponent;
}());
TasksComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tasks',
        templateUrl: 'tasks.component.html'
    }),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TasksComponent);
exports.TasksComponent = TasksComponent;
//# sourceMappingURL=tasks.component.js.map