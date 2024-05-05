import { useForm } from 'react-hook-form';

import TextField from '../../components/TextField';
import * as Actions from './actions';
import { handle } from '../../util/result';

import PunchClockImage from'../../images/punchclock-temp.png';
import styles from './styles.module.css';

interface IFormValues {
  email: string;
  password: string;
}

function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>()

  const onSubmit = handleSubmit(async (data) => {
    const result = await Actions.authenticate(data)
    handle(result,
      (jwt) => console.log('### Success: ', jwt),
      (failure) => console.log('### Failure: ', failure),
    );
  });

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <div className={styles.content}>
          <img className={styles.logo} src={PunchClockImage} />
          <h1>PUNCHCLOQ</h1>
          <h2>Sign In</h2>

          <form onSubmit={onSubmit}>
            <TextField
              name='email'
              inputProps={{
                placeholder: 'tomeka.james@example.com',
                ...register('email'),
              }}
              errors={errors}
            >
              Email
            </TextField>

            <TextField
              name='password'
              inputProps={{
                inputType: 'password',
                placeholder: '*********',
                ...register('password'),
              }}
              errors={errors}
            >
              Password
            </TextField>

            <input type='submit' value='Sign In'/>
          </form>
        </div>
      </div>
    </div>
  );
}

Auth.windowConfig = {
  width: 400,
  height: 600,
};

export default Auth;
