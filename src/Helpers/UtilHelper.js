const UtilHelper = {

    unmask(str) {
        return (str + '').replace(/\W+/g, '');
    },

    mask(str, mask) {
        let maskared = '';
        let sIndex = 0;

        str = this.unmask(str);

        if (typeof mask === 'function') {
            mask = mask(str);
        }

        switch (mask) {
            case 'cep':
                mask = '##.###-###';
                break;
            case 'cnpj':
                mask = '##.###.###.####/##';
                break;
            case 'cpf' :
                mask = '###.###.###-##';
                break;
            case 'phone':
                // Remover zeros à esquerda
                str = str.replace(/^0+/, '');

                mask = str.length > 10
                    ? '(##) # ####-####'
                    : '(##) ####-####';

                break;
            default:
                break;
        }

        for (let mIndex = 0; mIndex < mask.length; mIndex++) {
            if (!str[sIndex]) {
                break;
            }

            if (mask[mIndex] === '#') {
                maskared += str[sIndex];
                sIndex++;
            } else {
                maskared += mask[mIndex];
            }
        }

        return maskared;
    },

    timeToString(minutes, defaultEmpty = '-') {
        if (!minutes) {
            return defaultEmpty;
        }

        const hr = Math.floor(minutes / 60);
        const mn = minutes % 60;

        const hrLabel = hr > 1 ? 'hours' : 'hour';
        const mnLabel = mn > 1 ? 'minutes' : 'minute';

        let str = '';

        if (hr) {
            str += `${hr} ${hrLabel}`;
        }

        if (hr && mn) {
            str += ' and ';
        }

        if (mn) {
            str += `${mn} ${mnLabel}`;
        }

        return str;
    },

};

export default UtilHelper;