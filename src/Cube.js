import React, { Component } from 'react'
import * as THREE from 'three'

class Cube extends Component {
  componentDidMount() {
    const w = this.mount.clientWidth
    const h = this.mount.clientHeight

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75,
      w/h,
      0.1,
      1000
    )
    this.camera.position.z = 4

    this.renderer = new THREE.WebGLRenderer({antialias:true})
    this.renderer.setClearColor('#000000')
    this.renderer.setSize(w, h)
    this.mount.appendChild(this.renderer.domElement)
    
    const geometry = new THREE.BoxGeometry(1,1,1)
    const material = new THREE.MeshBasicMaterial({color: 0xff00ff})
    this.cube = new THREE.Mesh(geometry,material)
    this.scene.add(this.cube)

    this.start()
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnMount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId)
  }

  animate = () => {
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01
    
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 38) {
      this.cube.position.y += .1
    } else if (event.keyCode === 40) {
      this.cube.position.y -= .1
    } else if (event.keyCode === 37) {
      this.cube.position.x -= .1
    } else if (event.keyCode === 39) {
      this.cube.position.x += .1
    }
    this.renderScene()
  }

  render() {
    return (
      <div>
        <div 
          style={{ width: '800px', height: '600px' }}
          ref={(mount) => { this.mount = mount }}>  
        </div>
      </div>
    )
  }
}

export default Cube;
