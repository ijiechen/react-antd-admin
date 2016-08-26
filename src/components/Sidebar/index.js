import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router'
import { getAllMenu, updateNavPath } from '../../actions/menu'

const SubMenu = Menu.SubMenu

import './index.less'

const defaultProps = {
  items: [],
  currentIndex: 0
}

const propTypes = {
  items: PropTypes.array,
  currentIndex: PropTypes.number
}

class Sidebar extends React.Component {
  constructor (props) {
    super(props)
    this.state =  {
      current: 'sub1',
      openKeys: [],
    };
    this.menuClickHandle = this.menuClickHandle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  componentDidMount () {
    this.props.getAllMenu()
  }

  menuClickHandle (item) {
    console.log('click ', item);
    this.props.updateNavPath(item.keyPath, item.key)
  }

  handleClick(item) {
    console.log('click ',item);
    this.setState({
      current: item.key,
      openKeys: item.keyPath.slice(1),
    });
    this.props.updateNavPath(item.keyPath, item.key)
  }
  onToggle(item) {
    this.setState({
      openKeys:  item.open ? item.keyPath : item.keyPath.slice(1),
    });
  }

  render () {
    const { items } = this.props
    let openKey = []
    const menu = items.map((item) => {
      //openKey.push('sub'+item.key)
      return (
        <SubMenu
        key={'sub'+item.key}
        title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}
        >
        {item.child.map((node) => {
          return (
            <Menu.Item key={'menu'+node.key}>{node.name}</Menu.Item>
          )
        })}
        </SubMenu>
      )
    });
    return (
      <aside className="ant-layout-sider">
      <div className="ant-layout-logo"></div>
      <Menu
      mode="inline" theme="dark" openKeys={this.state.openKeys}
      onClick={this.handleClick}
      onOpen={this.onToggle}
      onClose={this.onToggle}
      selectedKeys={[this.state.current]}
      mode="inline"
      >
      {menu}
      </Menu>
      </aside>
    )
  }
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    items: state.menu.items,
    currentIndex: state.menu.currentIndex
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllMenu: bindActionCreators(getAllMenu, dispatch),
    updateNavPath: bindActionCreators(updateNavPath, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
