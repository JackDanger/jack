function UsersController() {
  this.index = function(params) {
    this.name = params['name'] || 'Aaron';
    return this.render('users/index.html.ejs');
  };
};

UsersController.prototype = new Jack.Controller();
