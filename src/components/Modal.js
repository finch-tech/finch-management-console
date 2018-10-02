// @flow
import React, { type Node, Component } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";

type Props = {
  children: Node,
  close: any
};

@observer
export class Modal extends Component<Props> {
  @observable
  active: boolean = false;

  componentDidMount() {
    setTimeout(() => {
      this.active = true;
    }, 100);
  }

  close = () => {
    this.active = false;
    setTimeout(() => {
      this.props.close();
    }, 100);
  };

  render() {
    return (
      <div className={`modal ${this.active ? "active" : ""}`}>
        <button className="close" onClick={this.close} />
        {this.props.children}
      </div>
    );
  }
}
