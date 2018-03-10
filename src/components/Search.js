import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity, Animated
} from 'react-native';
import { SCREEN_WIDTH } from '../constants/Constants';

let SearchPage = class extends Component {

    state = {
        placeholder: new Animated.Value(5)
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
    }

    animationDeactive(animation) {
        Animated.timing(this.state.placeholder, { toValue: 5, duration: animation ? 200 : 0 }).start();
    }


    render() {
        return (
            <View style={styles.container}>
                <View>
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
                            }}
                            autoCapitalize="none"
                            autoFocus={false}
                            onFocus={() => this.animationActive(true)}
                            onBlur={() => {
                                const { value } = this.state;
                                if (value && value.length === 0) {
                                    this.animationDeactive(true)}
                            }
                            }
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.buttonContainer} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Text style={styles.buttonStyle}>Search</Text>
                </TouchableOpacity>
            </View >
        );
    }
}
    
const styles = StyleSheet.create({

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
    placeholder: {
        position: 'absolute',
        left: 0
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        fontSize: 18,
        borderBottomColor: '#48BBEC',
        borderBottomWidth: 1,
        color: '#48BBEC'
    }
});

const mapStateToProps = (state) => {
    return {
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch);
  };

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
