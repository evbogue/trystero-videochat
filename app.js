import { h } from './h.js'
import { trystero } from './trystero.js'

document.body.style ='margin: 0;'

const container = h('div', {
  style: 'display: flex; flex-direction: row; flex-wrap: wrap; max-height: 100vw; max-width: 100vw; margin: 0;'
})

document.body.appendChild(container)

trystero.connect({appId: 'trytrysterovideo1', password: 'password'})

const selfStream = await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true
})

const myvideo = h('video', {
  autoplay: true, 
  style: 'transform: rotateY(180deg); height: auto; width: 100%; object-fit: cover;', 
  muted: true, 
  srcObject: selfStream
})

const mycontainer = h('div', {style: 'width: 25vw; height: 25vw; display: flex; position: fixed;' }, [myvideo])

container.appendChild(mycontainer)

trystero.addstream(selfStream)

trystero.join(peerId => trystero.addstream(selfStream, peerId))

trystero.leave(peerId => { 
  const get = document.getElementById(peerId)
  get.remove()
})

trystero.onstream((stream, peerId) => {
  const video = h('video', {
    autoplay: true,
    srcObject: stream, 
    style: 'height: auto; width: 100%; object-fit: cover;'   
  })

  const videocontainer = h('div', {
    id: peerId,
    style: 'width: 100vw; height: 100vw; display: flex;' 
  }, [video])
  container.appendChild(videocontainer)
})
