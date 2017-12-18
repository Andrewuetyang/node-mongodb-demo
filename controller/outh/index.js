import OuthModel from '../../models/outh/index'
import Ids from '../../models/ids'
import BaseComponent from '../baseComponent'
import crypto from 'crypto'
import dtime from 'time-formater'

class Outh extends BaseComponent {
  constructor () {
    super();
    this.signin = this.signin.bind(this);
    this.signup = this.signup.bind(this);
    this.encryption = this.encryption.bind(this);
    this.Md5 = this.Md5.bind(this);
  }
  async signin(req, res, next) {
    const {user_name, password} = req.body;
    try{
      if (!user_name) {
        throw new Error('用户名参数错误')
      }else if(!password){
        throw new Error('密码参数错误')
      }
    }catch(err){
      console.log(err.message, err);
      res.send({
        status: 0,
        type: 'GET_ERROR_PARAM',
        message: err.message,
      })
      return
    }
    const newpassword = this.encryption(password);
    try{
      const admin = await OuthModel.findOne({user_name})
      if (!admin) {
        res.send({
          status: 0,
          type: 'ERROR_PASSWORD',
          message: '该用户不存在，请先注册',
        })
      }else if(newpassword.toString() != admin.password.toString()){
        console.log('管理员登录密码错误');
        res.send({
          status: 0,
          type: 'ERROR_PASSWORD',
          message: '该用户已存在，密码输入错误',
        })
      }else{
        req.session.admin_id = admin.id;
        res.send({
          status: 1,
          success: '登录成功'
        })
      }
    }catch(err){
      console.log('登录管理员失败', err);
      res.send({
        status: 0,
        type: 'LOGIN_ADMIN_FAILED',
        message: '登录管理员失败',
      })
    }
	}
	async signup(req, res, next){
    const {user_name, password} = req.body;
    try{
      if (!user_name) {
        throw new Error('用户名错误')
      }else if(!password){
        throw new Error('密码错误')
      }
    }catch(err){
      console.log(err.message, err);
      res.send({
        status: 0,
        type: 'GET_ERROR_PARAM',
        message: err.message,
      })
      return
    }
    try{
      const admin = await OuthModel.findOne({user_name})
      if (admin) {
        console.log('该用户已经存在');
        res.send({
          status: 0,
          type: 'USER_HAS_EXIST',
          message: '该用户已经存在',
        })
      }else{
        const admin_id = await this.getId('admin_id');
        const newpassword = this.encryption(password);
        const newAdmin = {
          user_name, 
          password: newpassword,
          id: admin_id,
          create_time: dtime().format('YYYY-MM-DD')
        }
        await OuthModel.create(newAdmin)
        req.session.admin_id = admin_id;
        res.send({
          status: 1,
          message: '注册管理员成功',
        })
      }
    }catch(err){
      console.log('注册管理员失败', err);
      res.send({
        status: 0,
        type: 'REGISTER_ADMIN_FAILED',
        message: '注册管理员失败',
      })
    }
  }
  encryption(password){
		const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
		return newpassword
	}
	Md5(password){
		const md5 = crypto.createHash('md5');
		return md5.update(password).digest('base64');
	}
}

export default new Outh()