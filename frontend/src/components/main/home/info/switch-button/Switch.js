import React, {Component} from "react";
import "./Switch.css"

class Switch extends Component {

    render () {

        return(
            <div className="switch-container">
                <label >
                    <input ref="switch" checked={this.props.isChecked} onChange={this.props.onChange} className="switch" type="checkbox" />
                    <div>

                        <div></div>
                    </div>
                </label>
            </div>
        );
    }

}

export default Switch