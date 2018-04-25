using Microsoft.VisualStudio.TestTools.UnitTesting;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace DAL.Tests
{
    [TestClass()]
    public class DictionaryTreeDALTests
    {
        [TestMethod()]
        public void GetFathersTest()
        {
            int a = 0;
          var b=  new DictionaryTreeDAL().Query("0", 1, 1, ref a, ref a);
            Assert.Fail();
        }
    }
}