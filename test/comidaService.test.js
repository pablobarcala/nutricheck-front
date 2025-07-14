import { expect } from 'chai';
import sinon from 'sinon';
import { validateComidaData } from '../src/services/comidaService.js';

describe('ComidaService', () => {
    let fetchStub;

    beforeEach(() => {
        fetchStub = sinon.stub(global, 'fetch');
    })

    afterEach(() => {
        sinon.restore();
    })

    describe('validateComidaData', () => {
        it('debería devolver inválido cuando falte información requerida', () => {
            const result = validateComidaData(null, 'desayuno', '2024-01-15')
            
            expect(result.isValid).to.be.false;
            expect(result.error).to.equal('Faltan datos requeridos');
        })
    })
})