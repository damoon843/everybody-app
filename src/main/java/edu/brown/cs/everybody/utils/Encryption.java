package edu.brown.cs.everybody.utils;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

/**
 * Class to handle password encryption.
 * http://www.adeveloperdiary.com/java/how-to-easily-encrypt-and-decrypt-text-in-java/
 */
public class Encryption {
  /**
   * Encrypts a string using a given key using Blowfish encryption algorithm.
   * @param strClearText input string to encrypt
   * @param strKey unique key
   * @return encrypted string
   * @throws Exception
   */
  public static String encrypt(String strClearText,String strKey) throws Exception{
    String strData="";

    try {
      SecretKeySpec skeyspec=new SecretKeySpec(strKey.getBytes(),"Blowfish");
      Cipher cipher= Cipher.getInstance("Blowfish");
      cipher.init(Cipher.ENCRYPT_MODE, skeyspec);
      byte[] encrypted=cipher.doFinal(strClearText.getBytes());
      strData=new String(encrypted);

    } catch (Exception e) {
      e.printStackTrace();
      throw new Exception(e);
    }
    return strData;
  }

}
