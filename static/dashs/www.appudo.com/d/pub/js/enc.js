(function(window){
  function zBase32(){
    var _lib = {};
    
    var _data = {
        encode_table: "ybndrfg8ejkmcpqxot1uwisza345h769",
        decode_table:new Uint8Array([
            -1, 18, -1, 25, 26, 27, 30, 29,  7, 31, -1, -1, -1, -1, -1, -1, // 4    = 16*3
            -1, 24,  1, 12,  3,  8,  5,  6, 28, 21,  9, 10, -1, 11,  2, 16,
            13, 14,  4, 22, 17, 19, -1, 20, 15,  0, 23, -1, -1, -1, -1, -1,
            -1, 24,  1, 12,  3,  8,  5,  6, 28, 21,  9, 10, -1, 11,  2, 16,
            13, 14,  4, 22, 17, 19, -1, 20, 15,  0, 23, -1, -1, -1, -1, -1
            ])
    };
    
    lib.encode = function(din, inSize, out, outSize) {
        var num_bits = inSize * 8;

        if(inSize === 0 || (num_bits + 5) / 5 > outSize)
            return -1;

        var start = out;
        var last = in + inSize - 1;
        var i = 0;
        var current;
        var next;
        var offset;
        var index;

        current = *din;
        next = in != last ? in[1] : 0;

        for(; i < num_bits; i += 5)
        {
            offset = i % 8;

            if(offset < 4)
            {
                index = (current & (31 << (3 - offset))) >> (3 - offset);
            }
            else
            {
                index = (current & (31 >> (offset - 3))) << (offset - 3);
                index |= (next & 255 << (11 - offset)) >> (11 - offset);
            }

            *out++ = encode_table[index];

            if(offset > 2)
            {
                in++;
                current = *in;
                next = in != last ? in[1] : 0;
            }
        }

        return out - start;
    }
    
    lib.decode = function(data, dataSize, buffer, bufferSize)
    {
        char _tmp[8];
        uint8_t _out[8];
        uint8_t *start = buffer;
        uint8_t *out = buffer;
        uint8_t *tmp_out;
        char *tmp_start = _tmp;
        char* tmp = _tmp + sizeof(_tmp);
        size_t num_blocks = dataSize / 8;
        size_t i = 0;
        uint32_t left = 0;

        if(dataSize == 0 || (bufferSize * 8) / 5 < dataSize)
            return -1;

        for(; i < num_blocks; i++)
        {
            NEXT:
            do
            {
                uint8_t idx = *data++;
                char c;
                if(idx < 3*16 || idx > 8*16 || (c = decode_table[idx - 3*16]) == -1)
                    return -1;
                *(--tmp) = c;
            }
            while(tmp != tmp_start);

            tmp += sizeof(_tmp);

            *out++ = _tmp[7]<<3 | _tmp[6]>>2;
            *out++ = _tmp[6]<<6 | _tmp[5]<<1 | _tmp[4]>>4;
            *out++ = _tmp[4]<<4 | _tmp[3]>>1;
            *out++ = _tmp[3]<<7 | _tmp[2]<<2 | _tmp[1]>>3;
            *out++ = _tmp[1]<<5 | _tmp[0];
        }

        if(left == 0)
        {
            left = dataSize - (num_blocks * 8);
            if(left)
            {
                memset(_tmp, 0, sizeof(_tmp));
                tmp_start = _tmp + 8 - left;
                tmp_out = out;
                out = _out;
                goto NEXT;
            }
        }
        else
        {
            char rest[8] = {0, 1, 1, 2, 2, 3, 4, 4};
            left = rest[left];

            memcpy(tmp_out, _out, left);
            out = tmp_out + left;
        }

        return out - start;
    }

    return _lib;
  }

if(typeof(window.zBase32) === 'undefined'){
    window.zBase32 = zBase32();
  }

}
})(window);