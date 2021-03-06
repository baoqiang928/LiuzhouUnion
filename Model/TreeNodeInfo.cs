﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class TreeNodeInfo
    {
        private string _id = "";

        public string id
        {
            get
            {
                return _id;
            }

            set
            {
                _id = value;
            }
        }

        private string _name = "";
        public string name
        {
            get
            {
                return _name;
            }

            set
            {
                _name = value;
            }
        }

        public bool isParent
        {
            get
            {
                return _isParent;
            }

            set
            {
                _isParent = value;
            }
        }

        private bool _isParent = false;


        public string CoverPicUrl
        {
            get
            {
                return _CoverPicUrl;
            }

            set
            {
                _CoverPicUrl = value;
            }
        }
        private string _CoverPicUrl = "";

        public string Remark
        {
            get
            {
                return _Remark;
            }

            set
            {
                _Remark = value;
            }
        }
        private string _Remark = "";

    }
}
