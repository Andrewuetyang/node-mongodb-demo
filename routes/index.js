import test from './test'
import outh from './outh'
import signinCheck from '../controller/signinCheck'

export default app => {
  app.use('/test', signinCheck, test)
  app.use('/outh', outh)
}