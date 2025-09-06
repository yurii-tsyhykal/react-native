import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fonts} from '../../../constants/fonts';
import {CloseIcon} from '../../../assets/icons';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {applicationSchema} from '../../../schemas/schemas';
import Input from '../Input';

interface IAppForm {
  name: string;
  phone: string;
  email: string;
  comment: string;
}

export default function ApplicationForm() {
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors, isDirty, isValid},
  } = useForm<IAppForm>({
    defaultValues: {name: '', phone: '', email: '', comment: ''},
    resolver: yupResolver(applicationSchema),
    mode: 'onTouched',
  });
  return (
    <>
      <View style={styles.headerFormContainer}>
        <View style={styles.titleFormContainer}>
          <Text style={styles.titleForm}>Забрати хвостика додому</Text>
          <Text style={styles.subtitleForm}>
            Залиште свої дані і ми з Вами зв’яжемося
          </Text>
        </View>
        <TouchableOpacity>
          <CloseIcon />
        </TouchableOpacity>
      </View>
      <Controller
        name={'name'}
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            isAppForm={true}
            labelName={'Ім’я'}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            placeholder={'Введіть ваше ім’я'}
            error={errors.name?.message}
          />
        )}
      />
      <Controller
        name={'phone'}
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            isAppForm={true}
            labelName={'Телефон'}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            placeholder={'+380'}
            error={errors.phone?.message}
          />
        )}
      />
      <Controller
        name={'email'}
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            isAppForm={true}
            labelName={'Email'}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            placeholder={'Введіть свою пошту'}
            error={errors.email?.message}
          />
        )}
      />
      <Controller
        name={'comment'}
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            isAppForm={true}
            labelName={'Коментар'}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            placeholder={'Залиште свій коментар'}
            numberOfLines={6}
            additionalContainerStyle={{
              height: 100,
              alignItems: 'flex-start',
              paddingHorizontal: 14,
            }}
            error={errors.email?.message}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerFormContainer: {
    flexDirection: 'row',
  },
  titleFormContainer: {gap: 10},
  titleForm: {fontFamily: fonts.ComfortaaRegular, fontSize: 24},
  subtitleForm: {fontFamily: fonts.MontserratRegular},
});
