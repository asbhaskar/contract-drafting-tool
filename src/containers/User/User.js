import React, {Component} from 'react';
import TemplateCard from '../../components/TemplateCard/TemplateCard';
import firebase from '../../firebase/firebase.utils';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import './User.css';

export class User extends Component {
    state = {
        templates: [],
        loading: true
    }

    componentDidMount() {
        this.onGetTemplateData(this.props.match.params.uid)
    }

    onGetTemplateData = async(userUid) => {
        firebase
            .database()
            .ref('users/' + userUid + '/templates/')
            .on('value', (snapshot) => {
                let contractUidArray = []
                const data = snapshot.val()
                if (data === null) {
                    this.setState({loading: false})
                    return
                } else {
                    Object
                        .values(data)
                        .forEach(async(templateUid) => {
                            contractUidArray.push(templateUid)
                            contractUidArray.sort((a, b) => new Date(b.lastEdited) - new Date(a.lastEdited))
                        })
                    // contractUidArray.sort()
                    this.setState({templates: contractUidArray, loading: false})
                }
            })
    }

    render() {
        let templateArray = []
        for (let i in this.state.templates) {
            templateArray.push(this.state.templates[i])
        }
        return (
            <div>
                <Typography
                    variant="h2"
                    component="h2"
                    color="textSecondary"
                    className="welcome-name">
                    Welcome, {this.props.location.state.author}
                </Typography>
                {/* Create cards for each  */}
                {(this.state.loading)
                    ? <div className="page-center"><CircularProgress/></div>
                    : <div>
                        {(templateArray.length === 0)
                            ? <Typography
                                    variant="h5"
                                    component="h5"
                                    color="textSecondary"
                                    className="page-center">
                                    You currently have no saved Templates, click "Create Template" to get started!
                                </Typography>
                            : <div className="template-card-holder">
                                {templateArray.map(item => (
                                    <TemplateCard
                                        key={item.templateUid}
                                        title={item.title}
                                        author={item.author}
                                        description={item.description}
                                        templateUid={item.templateUid}
                                        userUid={this.props.match.params.uid}
                                        lastEdited={new Date(item.lastEdited).toLocaleString('en-us', {dateStyle: 'medium'})}
                                        data={item}/>))}
                            </div>}
                    </div>
                }
            </div>
        )
    }
}

export default User
