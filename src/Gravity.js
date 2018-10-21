import React, { Component } from 'react'
import * as THREE from 'three'

class Gravity extends Component {
    componentDidMount() {
        const w = this.mount.clientWidth;
        const h = this.mount.clientHeight;

        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(
            75,
            w/h,
            0.1,
            1000
        )
        this.camera.position.z = 4

        this.renderer = new THREE.WebGLRenderer({antialias:true})
        this.renderer.setClearColor('#66a0ff')
        this.renderer.setSize(w,h)
        this.mount.appendChild(this.renderer.domElement)

        const geometry = new THREE.SphereGeometry(1,64,64)
        const material = new THREE.MeshBasicMaterial({color: 0xef2828})
        this.sphere = new THREE.Mesh(geometry, material)
        this.sphere.position.y = 3.0;
        this.sphere.position.x = -3.0;
        this.scene.add(this.sphere)
        
        this.clock = new THREE.Clock({autoStart:true})

        this.accel = 0.1
        this.currentSpeed = this.sphere.position.y

        this.start()
    }

    componentWillUnmount() {
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
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
        if (this.sphere.position.y < -7.0) {
            this.sphere.position.y = 3.0;
            this.sphere.position.x = -3.0;
            this.clock.stop()
        }
        this.currentSpeed = this.sphere.position.y - (this.accel * this.clock.getElapsedTime())
        this.sphere.position.y = this.currentSpeed
        this.sphere.position.x += 0.09

        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
    }

    renderScene = () => {
        this.renderer.render(this.scene, this.camera)
    }

    render() {
        return (
            <div
                style={{width: '800px', height: '600px' }}
                ref={(mount) => {this.mount = mount}}>
            </div>      
        )
    }
}

export default Gravity;