import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      // console.log(values);
    }
  }
}


/*
function login(email, password, callback) {
  //this example uses the "tedious" library
  //more info here: http://pekim.github.io/tedious/index.html
  var connection = sqlserver.connect({
    userName: 'test',
    password: 'test',
    server: 'your-sql-server.example.com',
    options: {
      database: 'mydb',
      rowCollectionOnRequestCompletion: true
    }
  });

  var query = "SELECT Id, Nickname, Email, Password " +
    "FROM dbo.Users WHERE Email = @Email";

  connection.on('debug', function (text) {
    console.log(text);
  }).on('errorMessage', function (text) {
    console.log(JSON.stringify(text, null, 2));
  }).on('infoMessage', function (text) {
    console.log(JSON.stringify(text, null, 2));
  });

  connection.on('connect', function (err) {
    if (err) return callback(err);

    var request = new sqlserver.Request(query, function (err, rowCount, rows) {
      if (err) {
        callback(new Error(err));
      } else if (rowCount < 1) {
        callback(new WrongUsernameOrPasswordError(email));
      } else {
        bcrypt.compare(password, rows[0][3].value, function (err, isValid) {
          if (err) { callback(new Error(err)); }
          else if (!isValid) { callback(new WrongUsernameOrPasswordError(email)); }
          else {
            callback(null, {
              user_id: rows[0][0].value,
              nickname: rows[0][1].value,
              email: rows[0][2].value
            });
          }
        });
      }
    });

    request.addParameter('Email', sqlserver.Types.VarChar, email);
    connection.execSql(request);
  });
}
*/