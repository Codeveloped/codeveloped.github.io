import React, {Component} from 'react';


class Link extends Component {

    onClick(ev) {
        if (this.props.onClick) this.props.onClick(ev);
        ev.preventDefault();
        this.context.history.pushState(null, this.props.to);
    }

    render() {
        return <a href={this.props.to} {...this.props} onClick={::this.onClick}>{this.props.children}</a>
    }

}

Link.contextTypes = {
    history: React.PropTypes.object
};

export default Link;
