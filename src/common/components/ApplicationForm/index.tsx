import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fonts} from '../../../constants/fonts';
import {CloseIcon, DogImage} from '../../../assets/icons';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {applicationSchema} from '../../../schemas/schemas';
import Input from '../Input';
import DefaultBtn from '../DefaultBtn';
import {useState} from 'react';

interface IAppFormProps {
  onClose: () => void;
}

interface IAppForm {
  name: string;
  phone: string;
  email: string;
  comment: string;
}

export default function ApplicationForm({onClose}: IAppFormProps) {
  const [modalContent, setModalContent] = useState<'success' | 'form'>('form');

  const {
    control,
    handleSubmit,
    formState: {errors, isDirty, isValid},
  } = useForm<IAppForm>({
    defaultValues: {name: '', phone: '', email: '', comment: ''},
    resolver: yupResolver(applicationSchema),
    mode: 'onTouched',
  });

  const onSubmit = (data: IAppForm) => {
    console.log(data);
    setModalContent('success');
  };
  return (
    <View
      style={[
        styles.modalContainer,
        modalContent === 'success' && styles.modalContainerSuccess,
      ]}
    >
      {modalContent === 'form' ? (
        <>
          <View style={styles.headerFormContainer}>
            <View style={styles.titleFormContainer}>
              <Text style={styles.titleForm}>Забрати хвостика додому</Text>
              <Text style={styles.subtitleForm}>
                Залиште свої дані і ми з Вами зв'яжемося
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} hitSlop={15}>
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
                additionalContainerStyle={styles.comment}
                error={errors.email?.message}
              />
            )}
          />
          <DefaultBtn
            onPress={handleSubmit(onSubmit)}
            text={'Відправити'}
            disabled={!isDirty || !isValid}
          />
        </>
      ) : (
        <>
          <View style={styles.imageWrapper}>
            <Image
              source={DogImage}
              resizeMode={'contain'}
              style={styles.image}
            />
            <TouchableOpacity onPress={onClose} hitSlop={15}>
              <CloseIcon />
            </TouchableOpacity>
          </View>
          <View style={styles.successContainer}>
            <Text style={styles.titleForm}>Дякуємо за заявку!</Text>
            <Text style={styles.subtitleForm}>
              Вітаємо! Ти на крок ближче до того щоб завести собі пухнастого
              друга. Ми скоро зв'яжемося з тобою.
            </Text>
          </View>
          <DefaultBtn onPress={onClose} text={'Окей'} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    height: 600,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    paddingRight: 25,
    gap: 20,
  },
  modalContainerSuccess: {height: 300},
  headerFormContainer: {
    flexDirection: 'row',
  },
  titleFormContainer: {gap: 10},
  titleForm: {fontFamily: fonts.ComfortaaRegular, fontSize: 24},
  subtitleForm: {fontFamily: fonts.MontserratRegular},
  comment: {
    height: 100,
    alignItems: 'flex-start',
    paddingHorizontal: 14,
  },
  imageWrapper: {flexDirection: 'row'},
  image: {height: 80, width: 80, flex: 1},
  successContainer: {flex: 1, gap: 10, alignItems: 'center'},
});
