import React, { Component } from "react";

const styles = {
    position: "absolute",
    clip: "rect(0 0 0 0)",
    width: "1px",
    height: "1px",
    overflow: "hidden",
    margin: "-1px",
    border: 0,
    padding: 0,
    whiteSapce: "nowrap"
};

class A11yHidden extends Component {
    state = { isFocus: false };

    changeStateFocused = () => {
        this.setState({ isFocus: true });
    };

    changeStateBlured = () => {
        this.setState({ isFocus: false });
    };

    render() {
        let attrs = {};
        for (let [key, value] of Object.entries(this.props)) {
            if (key === "tag" || key === "focusable") {
                continue;
            }
            attrs[key] = value;
        }
        const { tag, focusable } = this.props;
        const { isFocus } = this.state;
        const Tag = tag || "span";
        return (
            <Tag
                style={!focusable ? styles : isFocus ? null : styles}
                {...attrs}
                onFocus={focusable && this.changeStateFocused}
                onBlur={focusable && this.changeStateBlured}
            />
        );
    }
}

export default A11yHidden;
