import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fonts} from '../../../constants/fonts';
import {CloseIcon, DogImage} from '../../../assets/icons';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  getApplicationSchema,
} from '../../../schemas/schemas';
import Input from '../Input';
import DefaultBtn from '../DefaultBtn';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';

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
  const {t} = useTranslation();

  const {
    control,
    handleSubmit,
    formState: {errors, isDirty, isValid},
  } = useForm<IAppForm>({
    defaultValues: {name: '', phone: '', email: '', comment: ''},
    resolver: yupResolver(getApplicationSchema()),
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
              <Text style={styles.titleForm}>{t('appForm.title')}</Text>
              <Text style={styles.subtitleForm}>{t('appForm.subtitle')}</Text>
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
                labelName={t('appForm.name.label')}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                placeholder={t('appForm.name.placeholder')}
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
                labelName={t('appForm.phone.label')}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                placeholder={t('appForm.phone.placeholder')}
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
                labelName={t('appForm.email.label')}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                placeholder={t('appForm.email.placeholder')}
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
                labelName={t('appForm.comment.label')}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                placeholder={t('appForm.comment.placeholder')}
                numberOfLines={5}
                additionalContainerStyle={styles.comment}
                error={errors.comment?.message}
              />
            )}
          />
          <DefaultBtn
            onPress={handleSubmit(onSubmit)}
            text={t('common.buttons.appForm')}
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
            <Text style={styles.titleForm}>{t('appForm.success.title')}</Text>
            <Text style={styles.subtitleForm}>
              {t('appForm.success.subtitle')}
            </Text>
          </View>
          <DefaultBtn
            onPress={onClose}
            text={t('common.buttons.appFormSuccess')}
          />
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
  modalContainerSuccess: {maxHeight: 300, gap: 0},
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
