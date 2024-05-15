import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import TextField from '../../components/TextField';
import * as Actions from './actions';
import { handle } from '../../util/result';

import PunchClockImage from'../../images/punchclock-temp.png';
import styles from './styles.module.css';

interface IFormValues {
  email: string;
  password: string;
  form?: string;
}

function Auth() {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<IFormValues>()

  const fields = watch();
  const [fieldsAtErrorTime, setFieldsAtErrorTime] = useState<string>(undefined);

  // Allows user to clear errors
  // by typing in any field
  useEffect(() => {
    if (fieldsAtErrorTime) {
      const currentFields = JSON.stringify(fields);
      if (currentFields !== fieldsAtErrorTime) {
        setFieldsAtErrorTime(undefined);
        setError('form', undefined);
      }
    }
  }, [fields, fieldsAtErrorTime]);

  const onSubmit = handleSubmit(async (data) => {
    const result = await Actions.authenticate(data)
    handle(result,
      async (_jwt) => {
        const result = await Actions.example();
        handle(result,
          ({ json }) => console.log('### Result: ', json),
          (failure) => console.log('### Failure: ', failure)
        )
      },
      async (_failure) => (
        setFieldsAtErrorTime(JSON.stringify(fields)),
        setError('form', {
            type: 'manual',
            message: 'Invalid email or password, please try again',
        })
      ),
    );
  });

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <div className={styles.content}>
          <img className={styles.logo} src={PunchClockImage} />
          <h1>PUNCHCLOQ</h1>
          <h2>Sign In</h2>
          {errors.form && <p className={styles.errorText}>{errors.form.message}</p>}

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
