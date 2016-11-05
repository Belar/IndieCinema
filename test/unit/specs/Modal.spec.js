import Vue from 'vue';
import Modal from 'client/components/Modal';

let propsData = {
  show: true,
  video: {
    name: 'Mauris at molestie nisi'
  }
};

const Ctor = Vue.extend(Modal);
const vm = new Ctor({
  propsData
}).$mount();

describe('Modal.vue component', function () {
  it('should accept show and video prop', function () {
    expect(typeof Modal.props.show).to.be.equal('object');
    expect(typeof Modal.props.video).to.be.equal('object');
  });

  it('should contain proper methods', function (done) {
    expect(typeof vm.closeMovie).to.be.equal('function');
    done();
  });

  it('should contain movie computed property with video prop data', function () {
    expect(vm.movie).to.be.equal(propsData.video);
  });

  before(function () {
    sinon.spy(vm, '$emit');
  });
  after(function () {
    vm.$emit.restore();
  });

  it('should emit call on modal close', function (done) {
    vm.closeMovie();
    expect(vm.$emit).to.be.called;
    done();
  });
});
