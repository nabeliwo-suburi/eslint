'use strict';

import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changePostTab, togglePostTabView } from '../actions/manage';

export default class ManagePost extends Component {
  handleSubmit(e) {
    e.preventDefault();
  }

  setSideClass() {
    let className = 'p-createPost__side';

    if (this.props.postTab.isVisible) {
      className += ' is-visible';
    }

    return className;
  }

  setArrowBtnClass() {
    let className = 'c-icon p-createPost__icon--manage-arrow';

    if (!this.props.postTab.isVisible) {
      className += ' is-close';
    }

    return className;
  }

  renderTabMenu() {
    switch (this.props.postTab.current) {
    case 'option':
      return <TabOption />;

    case 'category':
      return <TabCategory />;

    case 'tag':
      return <TabTag />;

    case 'image':
      return <TabImage />;

    default:
      return <TabOption />;
    }
  }

  render() {
    const { postTab, changePostTab, togglePostTabView } = this.props;

    return (
      <form className="p-createPost" onSubmit={this.handleSubmit}>
        <div className="p-createPost__main">
          <p className="p-createPost__title">新規投稿を追加</p>
          <input type="text" className="c-input c-input--middle u-fsll" placeholder="タイトル"/>

          <div className="p-createPost__post">
            <textarea className="p-createPost__post__input c-input c-input--large" placeholder="Let's enjoy blog :)"></textarea>

            <div className="p-createPost__post__count">
              <p><span>0</span>文字</p>
            </div>

            <ul className="p-createPost__post__btns">
              <li><a className="c-btn c-btn--middle c-btn--default u-hover" href="">公開する</a></li>
              <li><a className="c-btn c-btn--middle c-btn--off u-hover" href="">下書き保存する</a></li>
            </ul>
          </div>
        </div>

        <div className={this.setSideClass()}>
          <div className="p-createPost__side__icons">
            <div className="p-createPost__side__icons__switch">
              <div className="p-createPost__side__icons__btn" onClick={togglePostTabView}>
                <i className={this.setArrowBtnClass()}></i>
              </div>
            </div>

            <ul className="p-createPost__side__icon__list">
              {postTab.tabs.map((tab, i) =>
                <li key={i}>
                  <TabItem name={tab}
                           activeClass={(tab === postTab.current) ? 'is-active' : ''}
                           changePostTab={changePostTab} />
                </li>
              )}
            </ul>
          </div>
          <div className="p-createPost__side__contents">
            {this.renderTabMenu()}
          </div>
        </div>
      </form>
    );
  }
}

ManagePost.propTypes = {
  postTab: PropTypes.object.isRequired,
  togglePostTabView: PropTypes.func.isRequired,
  changePostTab: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    postTab: state.postTab
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    togglePostTabView,
    changePostTab
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagePost);
