import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Animated,
} from 'react-native';
import { SCREEN_WIDTH } from '../constants/Constants';
import { searchApi, clearData } from '../actions/SearchActions';

const QuoteData = ({searchResults = {}}) => {
    const quote = searchResults.quote || {};
    const isEmpty = Object.keys(quote).length === 0;
    return !isEmpty ? (<View style={styles.textContainer}>
        <Text style={styles.text}>Company: <Text style={styles.quoteVal}>{quote.companyName}</Text></Text>
        <Text style={styles.text}>Symbol: <Text style={styles.quoteVal}>{quote.symbol}</Text></Text>
        <Text style={styles.text}>Exchange: <Text style={styles.quoteVal}>{quote.primaryExchange}</Text></Text>
        <Text style={styles.text}>Sector: <Text style={styles.quoteVal}>{quote.sector}</Text></Text>
        <Text style={styles.text}>Price: <Text style={styles.quoteVal}>{quote.latestPrice}</Text></Text>
    </View>) : null;
}

let SearchPage = class extends Component {

    state = {
        symbol: '',
        isLoading: false,
        textEmpty: false,
        placeholder: new Animated.Value(5),
        fontSize: new Animated.Value(16)
    };

    componentWillMount() {
        const { value } = this.props;
        if (value && value.length > 0) {
            this.animationActive(false);
        }
      }
    
      componentWillReceiveProps(nextProps) {
        const { value } = nextProps;
        if (value && value.length > 0) {
            this.animationActive(false);
        }
      }
      
      animationActive(animation) {
        Animated.timing(this.state.placeholder, { toValue: 30, duration: animation ? 200 : 0 }).start();
        Animated.timing(this.state.fontSize, { toValue: 12, duration: animation ? 200 : 0 }).start();
      }
      
      animationDeactive(animation) {
        Animated.timing(this.state.placeholder, { toValue: 5, duration: animation ? 200 : 0 }).start();
        Animated.timing(this.state.fontSize, { toValue: 16, duration: animation ? 200 : 0 }).start();
      }
      

    async _onSearchPressed () {
        const { searchApi } = this.props;
        const symbol = this.state.value;
        if (!symbol) {
            this.setState({textEmpty: true});
            setTimeout(() => this.setState({textEmpty: false}), 2000);
            return;
        }
        if (symbol.length > 0) {
            try {
                searchApi({symbol});
            }
            catch(e) {

            }

        }
    }

    async goToNews () {
        const { navigation } = this.props;
        navigation.navigate('Feed');
    }

    deleteContent() {
        this.setState({value: ''});
        this.inputRef.blur();
        this.props.clearData();
        this.animationDeactive(true);
    }

    render() {
        const { searchData, favorites } = this.props;
        const spinner = this.state.isLoading ? <ActivityIndicator size='large' /> : null;
        console.log(this.props, this.props.searchData)
        return (
            <View style={styles.container}>
                <View style={[styles.inputWrapper]}>
                    <View style={styles.inputContainer}>
                        <Animated.Text style={[styles.placeholder, { bottom: this.state.placeholder, fontSize: this.state.fontSize }]}>Enter you search</Animated.Text>
                        <TextInput
                            style={[styles.searchInput, {width: SCREEN_WIDTH * 0.8}]}
                            ref={(inputRef) => { this.inputRef = inputRef; }}
                            autoCorrect
                            spellCheck
                            value={this.state.value}
                            onChangeText={(value) => {
                                this.setState({value});
                                this.componentWillReceiveProps({value});
                            }}
                            onFocus={() => this.animationActive(true)}
                            onBlur={() => {
                                const { value } = this.state;
                                if (value && value.length === 0) {
                                    this.animationDeactive(true)}
                                }
                            }
                            autoCapitalize="none"
                            autoFocus={false}
                        />
                        <View style={{ marginBottom: 10 }}>
                            <TouchableOpacity onPress={() => this.deleteContent()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                                <Text style={styles.clear}>X</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={(e) => this._onSearchPressed(e)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Text style={styles.buttonStyle}>Search</Text>
                </TouchableOpacity>
                {this.state.textEmpty && <Text>Search cannot be empty</Text>}
                <QuoteData searchResults={this.props.searchData} />
                {Object.keys(this.props.searchData).length > 0 && <TouchableOpacity style={styles.buttonContainer} onPress={(e) => this.goToNews(e)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Text style={styles.buttonStyle}>Go To News</Text>
                </TouchableOpacity>}
            </View >
        );
    }
}
    
const styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    inputContainer: {
        height: 50,
        alignItems: 'flex-end',
        flexDirection: 'row',
        zIndex: 100,
    },
    clear: {
        position: 'absolute',
        right: 0,
        top: -15,
        color: '#000000',
        width: 20,
        height: 30
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    buttonContainer: {
        backgroundColor: '#3399cc',
        width: 100,
        borderRadius: 5,
        padding: 15,
        marginTop: 20
    },
    buttonStyle: {
        color: '#fff',
        alignSelf: 'center'
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        fontSize: 18,
        borderBottomColor: '#48BBEC',
        borderBottomWidth: 1,
        color: '#48BBEC'
    },
    image: {
        width: 217,
        height: 138
    },
    placeholder: {
        position: 'absolute',
        left: 0
    },
    textContainer: {
        width: SCREEN_WIDTH * 0.8,
        borderColor: '#dddddd',
        borderRadius: 6,
        borderWidth: 2,
        padding: 5,
        paddingTop: 20,
        height: 150,
        marginTop: 20
    },
    quoteVal: {
        fontWeight: 'bold'
    },
    text: {
        color: 'black',
        paddingBottom:4
    }

});

const mapStateToProps = (state) => {
    const {
        searchResults: { data }
    } = state;
    return {
        searchData: data
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        searchApi,
        clearData
    }, dispatch);
  };

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
