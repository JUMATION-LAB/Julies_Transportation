
class Student {

    private  String name; 
    private  int age;

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }
    public String setName(String n) {
        return (name = n);
    }

    public int getAge() {
        return age;
    }
}

 class A {
     static int m = 10;

     static class B {
        static int n = 20;

        void show(){
        System.out.println( " this.n : " + this.n );
        System.out.print( " this.n : " + A.m );
        }

        void inShow(){
            System.out.println("INner B");
        }
     }

     void inShow(){
            System.out.println("INner B");
        }

        void bark(){
            System.out.println("Barking...");
        }
     
}

class D extends A{
    void inShow(){
            System.out.println("INner D");
        }
        void inShowing(){
            System.out.println("INner B");
        }
     }

public class Main {
    public static void main(String[] args) {

        final Student s1 = new Student("John", 20);
        
        final String name = new String("James");

        A a = new D();
        a.inShowing();
       




















    }
}
