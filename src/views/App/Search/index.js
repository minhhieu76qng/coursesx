import React from 'react';
import { withTranslation } from 'react-i18next';
import { isArray } from 'lodash';
import { connect } from 'react-redux';
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
import { showFlashMessage } from '../../../services/inapp/actions';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      instructors: [],
      searchText: '',
      searchLoading: false,
      isSearchFocus: false,
      searchHistories: [],
      deletingHistory: null,
      deleteModalVisible: false,
    };
  }

  componentDidMount() {
    this.getSearchHistories();
  }

  async getSearchHistories() {
    try {
      const histories = await CourseRepo.getSearchHistories();
      this.setState({
        searchHistories: histories,
      });
    } catch (e) {
      const { t, showNotification } = this.props;
      showNotification({
        description: t('cant_get_search_histories'),
      });
    }
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
      this.setState({
        searchLoading: true,
      });
      const { courses: listCourses, instructors: listInstructors } = await CourseRepo.searchCourses(
        {
          keyword: searchText,
        },
      );
      this.setState({
        courses: listCourses?.data || [],
        instructors: listInstructors?.data || [],
      });

      await this.getSearchHistories();
    } catch (e) {
      const { showNotification, t } = this.props;
      showNotification({
        description: t('cant_search'),
      });
    } finally {
      this.setState({
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

    try {
      if (deletingHistory) {
        await CourseRepo.removeSearchHistory(deletingHistory.id);
        const hisTmp = (searchHistories || []).filter((val) => val.id !== deletingHistory.id);
        this.setState({
          searchHistories: hisTmp,
        });
      }
    } catch (e) {
      const { showNotification, t } = this.props;
      showNotification({
        description: t('cant_delete_history'),
      });
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
      instructors,
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
                <Text>{JSON.stringify(instructors)}</Text>
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

const mapDispatchToProps = (dispatch) => {
  return {
    showNotification: ({ type = null, description }) =>
      dispatch(
        showFlashMessage({
          type,
          description,
        }),
      ),
  };
};
const WrappedWithRedux = connect(null, mapDispatchToProps)(WrappedWithTheme);

export default withTranslation('search_tab')(WrappedWithRedux);
