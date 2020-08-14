import React from 'react';
import { withTranslation } from 'react-i18next';
import { isArray } from 'lodash';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SearchBar } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import Badge from 'components/Badge';
import AppLayout from 'layouts/AppLayout';
import Text from 'components/Text';
import CourseRepo from 'services/courses/repo';
import AppModal from '../../../components/AppModal';

import styles from './styles';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      instructors: [],
      searchText: '',
      searchLoading: false,
      isSearchFocus: true,
      searchHistories: [],
      deletingHistory: null,
      deleteModalVisible: false,
    };
  }

  componentDidMount() {
    CourseRepo.getSearchHistories()
      .then((data) => {
        this.setState({
          searchHistories: data,
        });
      })
      .catch((e) => console.log(e));
  }

  onSearchTextChange = (text) => {
    this.setState({
      searchText: text,
    });
  };

  onSearchFocus = () => {
    this.setState({
      isSearchFocus: true,
    });
  };

  onSearchBlur = () => {
    this.setState({
      isSearchFocus: false,
    });
  };

  onSearchSubmit = async () => {
    const { searchText } = this.state;
    console.log('onSearchSubmit -> searchText', searchText);
    try {
      this.state({
        searchLoading: true,
      });
      const { courses: listCourses, instructors: listInstructors } = await CourseRepo.searchCourses(
        {
          keyword: searchText,
        },
      );
      this.state({
        courses: listCourses?.data || [],
        instructors: listInstructors?.data || [],
      });
    } catch (e) {
      console.log('onSearchSubmit -> e', e);
    } finally {
      this.state({
        searchLoading: false,
      });
    }
  };

  onCancelDeleteHistory = () => {
    this.setState({
      deleteModalVisible: false,
    });
  };

  onDeleteModalHide = () => {
    this.setState({
      deletingHistory: null,
    });
  };

  onConfirmDeleteHistory = async () => {
    const { deletingHistory, searchHistories } = this.state;
    console.log('onConfirmDeleteHistory -> deletingHistory', deletingHistory);

    try {
      if (deletingHistory) {
        await CourseRepo.removeSearchHistory(deletingHistory.id);
        const hisTmp = (searchHistories || []).filter((val) => val.id !== deletingHistory.id);
        this.setState({
          searchHistories: hisTmp,
        });
      }
    } catch (e) {
      console.log('Search -> onConfirmDeleteHistory -> e', e);
    } finally {
      this.setState({
        deleteModalVisible: false,
      });
    }
  };

  onLongPressHistory = (history) => {
    this.setState({
      deletingHistory: history,
      deleteModalVisible: true,
    });
  };

  render() {
    const { dark, t } = this.props;
    const {
      searchText,
      searchLoading,
      isSearchFocus,
      searchHistories,
      courses,
      deleteModalVisible,
      deletingHistory,
    } = this.state;
    const {
      onCancelDeleteHistory,
      onConfirmDeleteHistory,
      onDeleteModalHide,
      onLongPressHistory,
      onSearchBlur,
      onSearchFocus,
      onSearchSubmit,
      onSearchTextChange,
    } = this;
    return (
      <AppLayout>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <SearchBar
            placeholder="Search courses, instructors,..."
            containerStyle={styles.searchContainer}
            inputStyle={styles.searchInput}
            showCancel
            lightTheme={!dark}
            value={searchText}
            onChangeText={onSearchTextChange}
            showLoading={searchLoading}
            round
            onFocus={onSearchFocus}
            onBlur={onSearchBlur}
            onSubmitEditing={onSearchSubmit}
          />
          <View style={styles.container}>
            {isSearchFocus && (
              <Animatable.View
                animation="slideInUp"
                duration={300}
                style={styles.searchContentWrapper}
              >
                <Text>{`${t('search_history_title')}:`}</Text>
                <View style={styles.searchHistories}>
                  {isArray(searchHistories) &&
                    searchHistories.map((history) => (
                      <Badge
                        key={history.id}
                        id={history.id}
                        text={history.content}
                        onLongPress={() => onLongPressHistory(history)}
                      />
                    ))}
                </View>
              </Animatable.View>
            )}
            {!isSearchFocus && (
              <Animatable.View
                animation="slideInUp"
                duration={300}
                style={styles.searchContentWrapper}
              >
                <Text>{JSON.stringify(courses)}</Text>
              </Animatable.View>
            )}
          </View>
        </KeyboardAvoidingView>
        <AppModal
          isVisible={deleteModalVisible}
          title={t('delete_history_title')}
          cancelLabel={t('delete_history_cancel')}
          confirmLabel={t('delete_history_confirm')}
          onCancel={onCancelDeleteHistory}
          onConfirm={onConfirmDeleteHistory}
          onModalHide={onDeleteModalHide}
          canBackdropPress
          onBackdropPress={onCancelDeleteHistory}
        >
          <Text style={styles.deleteHistoryTextModal}>
            {`${t('delete_history_text')} ${deletingHistory?.content} ?`}
          </Text>
        </AppModal>
      </AppLayout>
    );
  }
}

const WrappedWithTheme = (props) => {
  const { dark } = useTheme();
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Search {...props} dark={dark} />;
};

export default withTranslation('search_tab')(WrappedWithTheme);
