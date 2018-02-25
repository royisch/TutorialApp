import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    WebView,
    Button,
    FlatList
} from 'react-native';
import moment from 'moment';
import { SCREEN_WIDTH } from '../constants/Constants';
import { searchApi } from '../actions/SearchActions';

let NewsFeed = class extends Component {

    state = {
        webViewVisible: false,
    };

    itemSelected = (index) => {
        const { news } = this.props;
        const item = news[index];
        this.setState({webViewVisible: true, url: item.url})
    }

    closeWebView = () => {
        this.setState({webViewVisible: false});
    }

    render() {
        const { news, favorites } = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    data={news}
                    inverted
                    style={styles.news_container}
                    contentContainerStyle={{ paddingVertical: 15 }}
                    initialNumToRender={0}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => (
                            <TouchableOpacity activeOpacity={0.6} onPress={() => this.itemSelected(index)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} >
                                <View style={styles.news_item}>
                                    <View>
                                        <View>
                                            <Text style={styles.title}>{item.headline}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.title}>{moment(item.datetime).format('DD/MM/YY HH:mm A')}</Text>
                                            <Text>Source: {item.source}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                />
                <Modal animationType={"slide"} transparent={false} visible={this.state.webViewVisible} >
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => this.closeWebView()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                            <View>
                                <Text style={styles.headerTitle}>
                                    Close
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerText}>Article</Text>
                        </View>
                    </View>
                    <WebView
                        automaticallyAdjustContentInsets={false}
                        javaScriptEnabled
                        style={{ marginTop: 20 }}
                        domStorageEnabled
                        decelerationRate="normal"
                        startInLoadingState
                        mediaPlaybackRequiresUserAction={false}
                        allowsInlineMediaPlayback
                        source={{uri: this.state && this.state.url}}
                    />
                </Modal>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        padding: 20,
        justifyContent: 'space-between',
        borderBottomColor: '#E1E1E1',
        borderBottomWidth: 1
    },
    news_container: {
        flex: 1,
        flexDirection: 'column'
    },
    title: {
        paddingTop: 3,
        paddingBottom: 3,
    },
    news_item: {
        flex: 1,
        flexDirection: 'row',
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        width: SCREEN_WIDTH,
        borderBottomWidth: 1,
        borderBottomColor: '#333333'
    },
    headerContainer: {
        marginTop: 36,
        backgroundColor: '#3399cc',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    headerTitle: {
        marginTop: 7,
    },
    headerTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: 5
    },
    headerText: {
        fontSize: 18
    }
});

const mapStateToProps = (state) => {
    const {
        searchResults: { data: { news } = {} }
    } = state;
    return {
        news
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        searchApi
    }, dispatch);
  };

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);